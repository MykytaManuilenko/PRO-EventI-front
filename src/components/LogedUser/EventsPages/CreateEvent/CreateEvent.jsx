import React, { useState } from "react";
import { useFormik } from "formik";
import eventStyle from "./CreateEvent.module.scss";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import axiosInstance from "../../../../utils/axiosInstance";
import PhotoModal from "../../AddPhotoModal/PhotoModal";
import Button from "../../../UI/Button/Button";

const CreateEvent = () => {
  const [modalShow, setModalShow] = useState();
  const [file, setFile] = useState();
  // const formData = new FormData();

  const createEvent = (data) => {
    // axiosInstance
    //   .post("/api/files", formData, {
    //     params: { type: "EVENT_BACKGROUND" },
    //   })
    //   .then((res) => {
    //     console.log("res :>> ", res.data.fileId);
    //     axiosInstance
    //       .post("/api/events", data)
    //       .then((res) => {
    //         console.log("res :>> ", res);
    //       })
    //       .catch((err) => {
    //         console.log("err :>> ", err);
    //       });
    //   })
    //   .catch((err) => console.log("err :>> ", err));
    console.log("data :>> ", data);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      type: [null],
      background: {},
      data: "",
      startTime: "",
      endTime: "",
      maxPlacesNumber: "",
      photos: [],
      location: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(2, "Must be at least 2 characters")
        .max(100, "Must be 100 characters or less")
        .required("Field is required"),
      // description: Yup.string()
      //   .max(1000, "Must be 1000 characters or less")
      //   .required("Field is required"),
      // price: Yup.number()
      //   .test(
      //     "Is positive?",
      //     "The number must be greater than 0!",
      //     (value) => value > 0
      //   )
      //   .required("Field is required"),
      // amount: Yup.number()
      //   .test(
      //     "Is positive?",
      //     "The number must be greater than 0!",
      //     (value) => value > 0
      //   )
      //   .required("Field is required"),
    }),
    onSubmit: () => {
      const formData = new FormData();
      const data = {
        title: formik.values.title,
        description: formik.values.description,
        price: formik.values.price,
        type: [],
        background: "",
        startTime: formik.values.startTime,
        endTime: formik.values.endTime,
        maxPlacesNumber: formik.values.maxPlacesNumber,
        photos: [],
        address: {
          country: "PL",
          city: "Warsaw",
          street: "Ciołka 6",
        },
      };
      // data.background = { UUID: "cef0cbf3-6458-4f13-a418-ee4d7e7505dd" };
      formData.append("file", file);
      console.log("LALLA :>> ");
      axiosInstance
        .post("/api/files", formData, {
          params: { type: "EVENT_BACKGROUND" },
        })
        .then((res) => {
          console.log("res :>> ", res.data.fileId);
          data.background = res.data.fileId;

          axiosInstance
            .post("/api/events", data)
            .then((res) => {
              console.log("res :>> ", res);
            })
            .catch((err) => {
              console.log("err :>> ", err);
              console.log("data :>> ", data);
            });
        })
        .catch((err) => console.log("err :>> ", err));
      // createEvent(data);
    },
  });
  let history = useHistory();

  return (
    <>
      <div className={eventStyle.createEventCont}>
        <div className={eventStyle.containerGoBack}>
          <p className={eventStyle.goBack} onClick={() => history.goBack()}>
            Go Back
          </p>
        </div>
        <div className={eventStyle.container}>
          <p className={eventStyle.title}>Create new event</p>
          <hr />
          <form
            className={eventStyle.createForm}
            onSubmit={formik.handleSubmit}
            noValidate
          >
            <div className={eventStyle.gridContainer}>
              {/* ======================================ADD PHOTOOO */}
              <div className="photoButton">
                <p onClick={() => setModalShow(true)}>Add photo</p>
              </div>
              {/* ======================================ADD PHOTOOO */}

              <div className={eventStyle.inputTitle}>
                <input
                  type="text"
                  className={eventStyle.nameInput}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.title}
                  placeholder="title"
                  name="title"
                />
                <label className={eventStyle.labels}>Title*</label>
                {formik.touched.title && formik.errors.title ? (
                  <p>{formik.errors.title}</p>
                ) : null}
              </div>

              <div className={eventStyle.inputType}>
                <input
                  type="text"
                  className={eventStyle.typeInput}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.type}
                  placeholder="title"
                  name="type"
                />
                <label className={eventStyle.labels}>Type*</label>
              </div>

              <div className={eventStyle.descriptionInput}>
                <label>Description*</label>
                <textarea
                  className={eventStyle.inputDescr}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                  placeholder="title"
                  name="description"
                />
                {formik.touched.description && formik.errors.description ? (
                  <p>{formik.errors.description}</p>
                ) : null}
              </div>

              <div className={eventStyle.dateInput}>
                <input
                  type="datetime-local"
                  className={eventStyle.inputDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.startTime}
                  placeholder="title"
                  name="startTime"
                />
                <label className={eventStyle.labels}>Start Time</label>
              </div>

              <div className={eventStyle.timeInput}>
                <input
                  type="datetime-local"
                  className={eventStyle.inputTime}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.endTime}
                  placeholder="title"
                  name="endTime"
                />
                <label className={eventStyle.labels}>End Time</label>
              </div>

              <div className={eventStyle.locationInput}>
                <input
                  type="text"
                  className={eventStyle.inputLocation}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.location}
                  placeholder="title"
                  name="location"
                />
                <label className={eventStyle.labels}>Location</label>
              </div>

              <div className={eventStyle.priceInput}>
                <input
                  type="number"
                  className={eventStyle.inputPrice}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.price}
                  placeholder="title"
                  name="price"
                />
                <label className={eventStyle.labels}>Price</label>
                {formik.touched.price && formik.errors.price ? (
                  <p>{formik.errors.price}</p>
                ) : null}
              </div>

              <div className={eventStyle.amountInput}>
                <input
                  type="number"
                  className={eventStyle.inputAmount}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.maxPlacesNumber}
                  placeholder="title"
                  name="maxPlacesNumber"
                />
                <label className={eventStyle.labels}>
                  Maximum amount of people
                </label>
                {formik.touched.maxPlacesNumber &&
                formik.errors.maxPlacesNumber ? (
                  <p>{formik.errors.maxPlacesNumber}</p>
                ) : null}
              </div>
            </div>

            {/* <button type="submit">Create</button> */}
            <Button type="submit" class={eventStyle.createButt}>
              Create
            </Button>

            {/* <p>{formData}</p> */}
          </form>
        </div>
      </div>

      <PhotoModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        // formData={formData}
        file={file}
        setFile={setFile}
      />
    </>
  );
};

export default CreateEvent;
