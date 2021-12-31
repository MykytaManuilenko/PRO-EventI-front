import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "../../UI/Button/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "../../../utils/axiosInstance";
import { useEffect } from "react";

const EditModal = (props) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      typeName: props.typename || "",
    },
    validationSchema: Yup.object({
      typeName: Yup.string()
        .min(2, "Must be at least 2 characters")
        .max(100, "Must be 100 characters or less")
        .required("Field is required"),
    }),
    onSubmit: () => {
      const data = { name: formik.values.typeName };
      axiosInstance
        .put(`/api/event-types/${props.typeid}`, data)
        .then((res) => {
          props.setChanged(!props.changed);
          props.onHide();
        })
        .catch((err) => {
          console.log("err :>> ", err);
        });
    },
  });

  useEffect(() => {
    formik.resetForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.show]);

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
          Edit event type
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form
          onSubmit={formik.handleSubmit}
          className="formCreateType"
          noValidate
        >
          <div className="contnType">
            <input
              type="text"
              className="inputType"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.typeName}
              placeholder="typeName"
              name="typeName"
            />
            <label>Type name*</label>
            {formik.touched.typeName && formik.errors.typeName ? (
              <p>{formik.errors.typeName}</p>
            ) : null}
          </div>
          <div className="buttContainer">
            <Button class="addTypeButt" type="submit">
              Save
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EditModal;
