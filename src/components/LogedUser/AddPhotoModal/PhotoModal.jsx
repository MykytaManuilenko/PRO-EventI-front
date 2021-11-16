import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import axiosInstance from "../../../utils/axiosInstance";
import Button from "../../UI/Button/Button";
import axios from "axios";

const PhotoModal = (props) => {
  //   const [file, setFile] = useState(null);

  const handleFile = (e) => {
    props.setFile(e.target.files[0]);
    // props.setFile(e.target.files[0]);
  };

  const savePhotos = (e) => {
    // const formData = new FormData();

    // props.formData.append("file", props.file);
    // formData.append("type", "EVENT_BACKGROUND");
    // localStorage.setItem("file", props.file);
    // console.log("file :>> ", props.file);

    // axiosInstance
    //   .post("/api/files", formData, {
    //     params: { type: "EVENT_BACKGROUND" },
    //   })
    //   .then((res) => console.log("res >> ", res.data.fileId))
    //   .catch((err) => console.log("err :>> ", err));
    // // console.log("formData :>> ", props.formData);
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
          //   onSubmit={formik.handleSubmit}
          //   className="formCreateType"
          onSubmit={(e) => savePhotos(e)}
          noValidate
        >
          <input type="file" name="file" onChange={(e) => handleFile(e)} />
          <div className="buttContainer">
            <Button
              class="addTypeButt"
              type="submit"
              //   onClick={(e) => savePhotos(e)}
            >
              Save
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default PhotoModal;
