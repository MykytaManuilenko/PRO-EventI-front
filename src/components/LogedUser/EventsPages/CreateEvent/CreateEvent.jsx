import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import "./CreateEvent.scss";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import axiosInstance from "../../../../utils/axiosInstance";
import PhotoModal from "../../AddPhotoModal/PhotoModal";
import Button from "../../../UI/Button/Button";
import axios from "axios";
import Multiselect from "multiselect-react-dropdown";
import Alert from "react-bootstrap/Alert";
import LocationAuto from "../../../UI/LocationAuto/LocationAuto";
import Input from "../../../UI/Input/Input";

const CreateEvent = () => {
  const [modalShow, setModalShow] = useState();
  const [file, setFile] = useState();
  const [multipleFiles, setMultipleFiles] = useState([]);
  const [backgroundUrl, setBackgroundUrl] = useState("");
  const [types, setTypes] = useState([]);
  const [selectedValue, setSelectedVal] = useState("");
  const [isError, setIsError] = useState({ status: false, message: "" });
  const [address, setAddress] = useState();
  const [freePrice, setFreePrice] = useState(false);

  useEffect(() => {
    getType();
  }, []);
  const getType = () => {
    axiosInstance
      .get("/api/event-types")
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
    enableReinitialize: true,
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
      price: !freePrice
        ? Yup.number()
            .test(
              "Is positive?",
              "The number must be greater than 0!",
              (value) => value > 0
            )
            .required("Field is required")
        : null,
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
        price: freePrice ? 0 : formik.values.price,
        type: selectedValue,
        background: "",
        startTime: formik.values.startTime,
        endTime: formik.values.endTime,
        maxPlacesNumber: formik.values.maxPlacesNumber,
        photos: [],
        address: {
          country: address.country,
          city: address.city,
          street: address.street,
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
        console.log("multipleFiles :>> ", multipleFiles);
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
      <div className="createEventCont">
        {isError.status && (
          <Alert variant="danger" onClose={() => setIsError(false)} dismissible>
            {isError.message}
          </Alert>
        )}

        <div className="containerGoBack">
          <p className="goBack" onClick={() => history.goBack()}>
            Go Back
          </p>
        </div>
        <div className="container">
          <p className="title">Create new event</p>
          <hr />
          <form
            className="createForm"
            onSubmit={formik.handleSubmit}
            noValidate
          >
            {/* ======================================ADD PHOTOOO */}
            <div className="firstRow">
              <div
                className="photoButton"
                onClick={() => setModalShow(true)}
                style={
                  backgroundUrl
                    ? {
                        background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), center / cover no-repeat url(${backgroundUrl}) `,
                        color: "white",
                      }
                    : null
                }
              >
                <img
                  alt=""
                  src="./camera_icon.svg"
                  style={{
                    height: "60px",
                    width: "60px",
                    marginBottom: "10px",
                  }}
                />
                <p className="addPhoto">Add photo</p>
              </div>
              {/* ======================================ADD PHOTOOO */}
              <Input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
                name="title"
                type="text"
                placeholder="title"
                touched={formik.touched.title}
                errors={formik.errors.title}
                labelName="Title*"
                className="inputContainer"
              />
              <div className="locationInput">
                <LocationAuto
                  setAddress={setAddress}
                  className="locationInput"
                  labelClass="labels"
                />
              </div>
            </div>
            {/* =====================DROPDOWN========= */}
            <div className="descriptionInput">
              <label>Description</label>
              <textarea
                className="inputDescr"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
                name="description"
              />
              {formik.touched.description && formik.errors.description ? (
                <p className="errorText">{formik.errors.description}</p>
              ) : null}
            </div>
            <div className="inputMultiSelect">
              <Multiselect
                onRemove={function noRefCheck() {}}
                onSearch={function noRefCheck() {}}
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
                  },
                  searchBox: {
                    border: "none",
                    padding: "0",
                    borderBottom: "1px solid #0f10304f",
                    borderRadius: "0",
                    height: "100%",
                  },
                  inputField: {
                    marginBottom: selectedValue.length !== 0 ? "6px" : "6px",
                    height: "100%",
                    fontWeight: "300",
                    fontSize: "13px",
                    color: "#919191",
                  },
                  chips: {
                    backgroundColor: "rgb(134 152 233)",
                    color: "#fffff",
                  },
                }}
              />
            </div>
            <div className="secondRow">
              <Input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.startTime}
                name="startTime"
                type="datetime-local"
                placeholder="startTime"
                touched={formik.touched.startTime}
                errors={formik.errors.startTime}
                labelName="Start time*"
                className="inputContainer"
              />
              <Input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.endTime}
                name="endTime"
                type="datetime-local"
                placeholder="endTime"
                touched={formik.touched.endTime}
                errors={formik.errors.endTime}
                labelName="End Time*"
                className="inputContainer"
              />
            </div>
            <div className="thirdRow">
              <div style={{ width: "100%" }}>
                <Input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.price}
                  name="price"
                  type="number"
                  placeholder="price"
                  touched={formik.touched.price}
                  errors={formik.errors.price}
                  labelName="Price*"
                  className="inputContainer"
                  disabled={freePrice ? true : false}
                />
                <div className="priceCheckbox">
                  <input
                    className="inputPrice"
                    type="checkbox"
                    onChange={() => setFreePrice(!freePrice)}
                  />
                  <label className="checkboxLabel">
                    The event will be free
                  </label>
                </div>
              </div>

              <Input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.maxPlacesNumber}
                name="maxPlacesNumber"
                type="number"
                placeholder="maxPlacesNumber"
                touched={formik.touched.maxPlacesNumber}
                errors={formik.errors.maxPlacesNumber}
                labelName="Maximum amount of people*"
                className="inputContainer"
              />
            </div>
            <Button type="submit" class="createButt">
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
        setBackgroundUrl={setBackgroundUrl}
      />
    </>
  );
};

export default CreateEvent;
