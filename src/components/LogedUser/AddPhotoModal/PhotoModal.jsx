import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "../../UI/Button/Button";
import "./PhotoModal.scss";

const PhotoModal = (props) => {
  const [preview, setPreview] = useState();
  const [previewMultiple, setPreviewMultiple] = useState([]);

  const handleFile = (e) => {
    props.setFile(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleMultipleFile = (e) => {
    if (
      previewMultiple.length + e.target.files.length > 5 ||
      e.target.files.length > 5
    ) {
      console.log("TOO MUCH PHOTO :>> ");
    } else {
      const fileArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setPreviewMultiple((prevImages) => prevImages.concat(fileArray));
      props.setMultipleFiles(e.target.files);
    }
  };

  const showPhotos = (source) => {
    return source.map((image) => {
      return (
        <div className="previewPhoto" key={image}>
          <img src={image} alt=""></img>
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
            <div className="inputEventPhoto">
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
          </div>

          <div className="previewPhotoContainer">
            <div className="previewPhoto">
              <img src={preview} alt=""></img>
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
