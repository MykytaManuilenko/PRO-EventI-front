import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import eventStyle from "./CreateEvent.module.scss";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import axiosInstance from "../../../../utils/axiosInstance";
import PhotoModal from "../../AddPhotoModal/PhotoModal";
import Button from "../../../UI/Button/Button";
import axios from "axios";
import Multiselect from "multiselect-react-dropdown";
import Alert from "react-bootstrap/Alert";

const CreateEvent = () => {
  const [modalShow, setModalShow] = useState();
  const [file, setFile] = useState();
  const [multipleFiles, setMultipleFiles] = useState();
  const [types, setTypes] = useState([]);
  const [selectedValue, setSelectedVal] = useState("");
  const [isError, setIsError] = useState({ status: false, message: "" });

  useEffect(() => {
    getType();
  }, []);
  const getType = () => {
    axiosInstance
      .get("/api/events/type")
      .then((res) => {
        setTypes(res.data);
        console.log("res.data :>> ", res.data);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  };

  const createEventOnlyBackground = (formData, data) => {
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
            history.push(`/events/${res.data.eventId}`);
            isError && setIsError({ status: false, message: "" });
          })
          .catch((err) => {
            console.log("err :>> ", err.response);
            setIsError({ status: true, message: err.response.data.message });
          });
        isError && setIsError({ status: false, message: "" });
      })
      .catch((err) => {
        setIsError({ status: true, message: err.response.data.message });
        console.log("err :>> ", err);
      });
  };

  const createEvent = (formDataMultiple, formData, data) => {
    axios
      .all([
        axiosInstance.post("/api/files/bulk", formDataMultiple, {
          params: { type: "EVENT_PHOTO" },
        }),
        axiosInstance.post("/api/files", formData, {
          params: { type: "EVENT_BACKGROUND" },
        }),
      ])
      .then((res1) => {
        res1.map((res) => {
          if (res.data.length !== 0) {
            for (let i = 0; i < res.data.length; i++) {
              data.photos.push(res.data[i].fileId);
            }
          }
          data.background = res.data.fileId;
        });
        isError && setIsError({ status: false, message: "" });

        axiosInstance
          .post("/api/events", data)
          .then((res) => {
            isError && setIsError({ status: false, message: "" });
            history.push(`/events/${res.data.eventId}`);
          })
          .catch((err) => {
            console.log("err.mes :>> ", err.message);
            setIsError({ status: true, message: err.response.data.message });
          });
      })
      .catch((err) => {
        console.log("err.messsss :>> ", err.response.data.message);
        setIsError({ status: true, message: err.response.data.message });
      });
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      type: [],
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
      description: Yup.string()
        .max(1000, "Must be 1000 characters or less")
        .required("Field is required"),
      price: Yup.number()
        .test(
          "Is positive?",
          "The number must be greater than 0!",
          (value) => value > 0
        )
        .required("Field is required"),
      maxPlacesNumber: Yup.number()
        .test(
          "Is positive?",
          "The number must be greater than 0!",
          (value) => value > 0
        )
        .required("Field is required"),
    }),
    onSubmit: () => {
      const formData = new FormData();
      const formDataMultiple = new FormData();

      const data = {
        title: formik.values.title,
        description: formik.values.description,
        price: formik.values.price,
        type: selectedValue,
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
      formData.append("file", file);
      if (selectedValue.length !== 0) {
        const mapValue = [];
        selectedValue.map((value) => {
          mapValue.push(value.name);
        });
        data.type = mapValue;
      } else {
        data.type = selectedValue.name;
      }

      if (multipleFiles && multipleFiles.length !== 0) {
        const multipleArrFile = Array.from(multipleFiles);
        multipleArrFile.forEach((file) => {
          formDataMultiple.append("files", file);
        });
        createEvent(formDataMultiple, formData, data);
      } else {
        createEventOnlyBackground(formData, data);
      }
    },
  });
  let history = useHistory();

  return (
    <>
      <div className={eventStyle.createEventCont}>
        {isError.status && (
          <Alert variant="danger" onClose={() => setIsError(false)} dismissible>
            {isError.message}
          </Alert>
        )}

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
            {/* ======================================ADD PHOTOOO */}
            <div className={eventStyle.firstRow}>
              <div
                className={eventStyle.photoButton}
                onClick={() => setModalShow(true)}
              >
                <img
                  alt=""
                  src="./camera_icon.png"
                  style={{
                    height: "50px",
                    width: "60px",
                    marginBottom: "10px",
                  }}
                />
                <p className={eventStyle.addPhoto}>Add photo</p>
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
                  <p className={eventStyle.errorText}>{formik.errors.title}</p>
                ) : null}
              </div>

              {/* =====================DROPDOWN========= */}
              <div className={eventStyle.inputMultiSelect}>
                <Multiselect
                  onRemove={function noRefCheck() {}}
                  onSearch={function noRefCheck() {}}
                  // onSelect={(e) => {
                  //   // console.log("onSelect :>> ", e);
                  //   setSelectedVal(e);
                  // }}
                  onSelect={(e) => setSelectedVal(e)}
                  options={types}
                  onKeyPressFn={function noRefCheck() {}}
                  placeholder="Type"
                  displayValue="name"
                  closeOnSelect={false}
                  selectionLimit={2}
                  style={{
                    multiselectContainer: {
                      width: "100%",
                      // marginTop: selectedValue.length !== 0 ? "5px" : "10px",
                    },
                    searchBox: {
                      border: "none",
                      padding: "0",
                      borderBottom: "1px solid #0f10304f",
                      borderRadius: "0",
                      height: "100%",
                    },
                    inputField: {
                      margin: "0",
                      height: "100%",
                    },
                    chips: {
                      backgroundColor: "rgba(167, 169, 163, 0.41)",
                      color: "#0C0D2C",
                    },
                  }}
                />
              </div>
            </div>
            {/* =====================DROPDOWN========= */}
            <div className={eventStyle.gridContainer}>
              <div className={eventStyle.descriptionInput}>
                <label>Description*</label>
                <textarea
                  className={eventStyle.inputDescr}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                  name="description"
                />
                {formik.touched.description && formik.errors.description ? (
                  <p className={eventStyle.errorText}>
                    {formik.errors.description}
                  </p>
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
                  <p className={eventStyle.errorText}>{formik.errors.price}</p>
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
                  <p className={eventStyle.errorText}>
                    {formik.errors.maxPlacesNumber}
                  </p>
                ) : null}
              </div>
            </div>
            <Button type="submit" class={eventStyle.createButt}>
              Create
            </Button>
          </form>
        </div>
      </div>

      <PhotoModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        file={file}
        setFile={setFile}
        multipleFiles={multipleFiles}
        setMultipleFiles={setMultipleFiles}
      />
    </>
  );
};

export default CreateEvent;
