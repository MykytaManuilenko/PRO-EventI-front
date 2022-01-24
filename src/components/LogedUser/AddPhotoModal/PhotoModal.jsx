import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "../../UI/Button/Button";
import "./PhotoModal.scss";

const PhotoModal = (props) => {
  const [preview, setPreview] = useState(
    props.backgroundURL !== " " && props.backgroundURL
  );
  const [previewMultiple, setPreviewMultiple] = useState(
    props.eventPhotosURL
      ? props.eventPhotosURL.length === 0
        ? []
        : props.eventPhotosURL
      : []
  );

  const handleFile = (e) => {
    props.setFile(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
    props.setBackgroundUrl(URL.createObjectURL(e.target.files[0]));
  };

  const handleMultipleFile = (e) => {
    if (
      previewMultiple.length + e.target.files.length > 5 ||
      e.target.files.length > 5
    ) {
      console.log("TOO MUCH PHOTO :>> ");
    } else {
      const files = [...props.multipleFiles];
      const arrayWithUrls = [];
      const arrayWithPhotosId = [];
      Array.from(e.target.files).map((file) => {
        files.push(file);
        props.setMultipleFiles(files);
        console.log("object :>> ", URL.createObjectURL(file));
        arrayWithUrls.push(URL.createObjectURL(file));
      });
      arrayWithUrls.map((photo) => {
        const tmp = photo.split("/");
        arrayWithPhotosId.push(tmp[3]);
        console.log("tmp :>> ", tmp);
      });
      props.setPhotosId((prevPhotoId) => prevPhotoId.concat(arrayWithPhotosId));
      setPreviewMultiple((prevImages) => prevImages.concat(arrayWithUrls));
    }
  };

  const onRemoveFromArray = (index, arrayWithPhoto) => {
    arrayWithPhoto.splice(index, 1);
    console.log("arrayWithPhotoChanged :>> ", arrayWithPhoto);
    setPreviewMultiple((prevPhoto) =>
      prevPhoto.filter((photo) => photo.id !== index)
    );
    return arrayWithPhoto;
  };
  const onRemoveBackground = () => {
    props.setBackgroundUrl("");
    setPreview("");
  };

  const showPhotos = (source) => {
    return source.map((image, index) => {
      return (
        <div
          className="previewPhoto"
          key={index}
          style={{
            background: `center / cover no-repeat url(${image}) `,
          }}
        >
          <div
            className="removePhoto"
            onClick={() => onRemoveFromArray(index, source)}
          >
            x
          </div>
        </div>
      );
    });
  };

  const savePhotos = (e) => {
    e.preventDefault();
    props.onHide();
  };

  return (
    <Modal
      onHide={props.onHide}
      show={props.show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add event type
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form
          className="formAddPhoto"
          onSubmit={(e) => savePhotos(e)}
          noValidate
        >
          <div className="inputContainer">
            <div className="inputBackground">
              <input
                type="file"
                name="file"
                multiple={false}
                onChange={(e) => handleFile(e)}
                accept="image/*"
              />
              <label>Add background photo</label>
            </div>
            <div
              className={`inputEventPhoto ${
                previewMultiple.length >= 5 ? "disabledInput" : ""
              }`}
            >
              <input
                type="file"
                name="file"
                multiple
                onChange={(e) => handleMultipleFile(e)}
                disabled={previewMultiple.length >= 5 ? true : false}
                accept="image/*"
              />
              <label>Add event photos</label>
            </div>
            <div className="inputTooltip">You can add maximum 5 photos</div>
          </div>

          <div className="previewPhotoContainer">
            <div className="backgroundContainer">
              <div
                className="previewPhoto"
                style={
                  preview
                    ? {
                        background: `center / cover no-repeat url(${preview}) `,
                      }
                    : null
                }
              >
                <div
                  className="removePhoto"
                  onClick={() => onRemoveBackground()}
                >
                  x
                </div>
              </div>
              <p style={{ color: "#807C7C", textAlign: "center" }}>
                background
              </p>
            </div>
            {showPhotos(previewMultiple)}
          </div>

          <Button class="addTypeButt" type="submit">
            Save
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default PhotoModal;
