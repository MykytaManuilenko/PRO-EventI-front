import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "../../UI/Button/Button";
import AlertBootstrap from "../Alert/AlertBootstrap";
import "./ModalUi.scss";

const ModalUi = (props) => {
  return (
    <>
      {/* <AlertBootstrap /> */}
      <Modal show={props.show} onHide={props.hide} centered>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <p style={{ textAlign: "center" }} className="errorText">
          {props.error !== "" ? props.error : ""}
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            gap: "20px",
          }}
        >
          <Button class="confirmButt" onClick={props.firstBttClick}>
            {props.firstButton}
          </Button>
          <Button class="rejectButt" onClick={props.secondBttClick}>
            {props.secondButton}
          </Button>
        </div>
      </Modal>
    </>
  );
};
export default ModalUi;
