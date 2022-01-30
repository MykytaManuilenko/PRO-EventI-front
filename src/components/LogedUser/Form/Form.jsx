import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import "../../LogedUser/EventsPages/CreateEvent/CreateEvent.scss";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import axiosInstance from "../../../utils/axiosInstance";
import PhotoModal from "../AddPhotoModal/PhotoModal";
import Button from "../../UI/Button/Button";
import Multiselect from "multiselect-react-dropdown";
import LocationAuto from "../../UI/LocationAuto/LocationAuto";
import Input from "../../UI/Input/Input";
import { convertDateWithTime } from "../../../utils/convertDate";
import { CameraIcon } from "../../../assets/icons";
import {
  createEventOnSubmit,
  createEventOnlyBackground,
  saveEditedEventWithPhotos,
  saveWithoutPhoto,
  saveEditedEventWithBackground,
  saveWithPhotosBackground,
} from "./createEventMethod";
import { useDispatch } from "react-redux";
import AlertBootstrap from "../../UI/Alert/AlertBootstrap";

const Form = (props) => {
  const [modalShow, setModalShow] = useState();
  const [file, setFile] = useState();
  const [multipleFiles, setMultipleFiles] = useState([]);

  const [backgroundUrl, setBackgroundUrl] = useState(
    props.data ? props.data.backgroundUrl : ""
  );
  const [types, setTypes] = useState([]);
  const [selectedValue, setSelectedVal] = useState([]);
  const [address, setAddress] = useState(
    props.data && {
      country: props.data.address.country,
      city: props.data.address.city,
      street: props.data.address.street,
    }
  );
  const [freePrice, setFreePrice] = useState(
    props.data && (props.data.price === `0.00` ? true : false)
  );
  const dispatch = useDispatch();
  const [photosId, setPhotosId] = useState("");
  const [photosIdRecieved, setPhotosIdRecieved] = useState([]);
  const [buttonState, setButtonState] = useState("");
  const MAXVALUE = 1000;

  useEffect(() => {
    getType();
    setPhotoId();
  }, []);

  const setPhotoUrl = () => {
    const tmp = [];
    if (props.data) {
      props.data.photos.map((photoURL) => {
        tmp.push(photoURL.photoUrl);
      });
    }
    return tmp;
  };

  const setPhotoId = () => {
    const tmp = [];
    if (props.data && props.data.photos !== "") {
      props.data.photos.map((photo) => {
        tmp.push(photo.fileId);
      });
      setPhotosId(tmp);
      setPhotosIdRecieved(tmp);
    }
    return tmp;
  };

  const photosURL = setPhotoUrl();

  const getType = () => {
    axiosInstance
      .get("/api/event-types")
      .then((res) => {
        setTypes(res.data);
        const userTypes = setUserTypes(props.data.types, res.data);
        setSelectedVal(userTypes);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  };
  const setUserTypes = (userEventType, types) => {
    const displaySelectedArray = [];
    types.map((value) => {
      if (userEventType.includes(value.name)) {
        displaySelectedArray.push(value);
      }
    });
    return displaySelectedArray;
  };

  const isPhotoChanged = (data, submittedData) => {
    console.log("submittedData :>> ", submittedData);
    console.log(
      "data.photos === submittedData.photos :>> ",
      photosIdRecieved === submittedData.photos
    );
    console.log(
      "data.backgroundUrl === submittedData.background :>> ",
      data.backgroundUrl === submittedData.background
    );
    console.log("data :>> ", data);
    console.log("submittedData :>> ", submittedData);
    let whatIsChanged = "changedBoth";
    if (
      data.backgroundUrl === submittedData.background &&
      photosIdRecieved === photosId
    ) {
      whatIsChanged = "noChanges";
      return whatIsChanged;
    } else if (
      data.backgroundUrl === submittedData.background &&
      photosIdRecieved !== photosId
    ) {
      whatIsChanged = "photosChanged";
      return whatIsChanged;
    } else if (
      data.backgroundUrl !== submittedData.background &&
      photosIdRecieved === photosId
    ) {
      whatIsChanged = "backgroundChanged";
      return whatIsChanged;
    }
    return whatIsChanged;
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: props.data ? props.data.title : "",
      description: props.data ? props.data.description : "",
      price: props.data ? props.data.price : "",
      type: props.data ? props.data.types : [],
      background: props.data ? props.data.backgroundUrl : {},
      data: props.data ? props.data.data : "",
      startTime: props.data ? props.data.startTime : "",
      endTime: props.data ? props.data.endTime : "",
      maxPlacesNumber: props.data ? props.data.maxPlacesNumber : "",
      photos: props.data ? props.data.photos : [],
      location: props.data ? props.data.address : "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(2, "Must be at least 2 characters")
        .max(100, "Must be 100 characters or less")
        .required("Field is required"),
      description: Yup.string()
        .max(MAXVALUE, "Must be 1000 characters or less")
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
      const data = {
        title: formik.values.title,
        description: formik.values.description,
        price: freePrice ? 0 : formik.values.price,
        type: selectedValue,
        background: backgroundUrl !== "" ? backgroundUrl : {},
        startTime: formik.values.startTime,
        endTime: formik.values.endTime,
        maxPlacesNumber: formik.values.maxPlacesNumber,
        photos: photosIdRecieved,
        address: {
          country: address.country,
          city: address.city,
          street: address.street,
        },
      };
      const formData = new FormData();
      const formDataMultiple = new FormData();
      if (selectedValue.length !== 0) {
        const mapValue = [];
        selectedValue.map((value) => {
          mapValue.push(value.name);
        });
        data.type = mapValue;
      } else {
        data.type = selectedValue.name;
      }

      if (props.isEdit) {
        let whatIsChanged = isPhotoChanged(props.data, data);
        if (multipleFiles && multipleFiles.length !== 0) {
          const multipleArrFile = Array.from(multipleFiles);
          multipleArrFile.forEach((file) => {
            formDataMultiple.append("files", file);
          });
        }

        if (whatIsChanged === "changedBoth") {
          console.log("changedBoth :>> ");
          formData.append("file", file);
          console.log("formDataMultiple :>> ", formDataMultiple);
          saveWithPhotosBackground(
            props.eventId,
            data,
            formData,
            formDataMultiple,
            buttonState === "Save and Publish" ? true : false,
            history,
            dispatch
          );
        } else if (whatIsChanged === "noChanges") {
          console.log("noChanges :>> ");
          const arrOfBackgroundURL = props.data.backgroundUrl.split("/");
          data.background = arrOfBackgroundURL[4];
          saveWithoutPhoto(
            props.eventId,
            data,
            buttonState === "Save and Publish" ? true : false,
            history,
            dispatch
          );
        } else if (whatIsChanged === "photosChanged") {
          console.log("photosChanged :>> ");
          const arrOfBackgroundURL = props.data.backgroundUrl.split("/");
          data.background = arrOfBackgroundURL[4];
          saveEditedEventWithPhotos(
            props.eventId,
            data,
            formDataMultiple,
            buttonState === "Save and Publish" ? true : false,
            history,
            dispatch
          );
        } else if (whatIsChanged === "backgroundChanged") {
          console.log("backgroundChanged :>> ");
          formData.append("file", file);
          saveEditedEventWithBackground(
            props.eventId,
            data,
            formData,
            buttonState === "Save and Publish" ? true : false,
            history,
            dispatch
          );
        }
      } else {
        formData.append("file", file);

        if (multipleFiles && multipleFiles.length !== 0) {
          const multipleArrFile = Array.from(multipleFiles);
          multipleArrFile.forEach((file) => {
            formDataMultiple.append("files", file);
          });
          console.log("dataToCreate :>> ", data);
          createEventOnSubmit(
            formDataMultiple,
            formData,
            data,
            history,
            dispatch
          );
          console.log("Multiple files :>> ");
        } else {
          createEventOnlyBackground(formData, data, history, dispatch);
        }
      }
    },
  });
  let history = useHistory();
  return (
    <>
      <div className="createEventCont">
        <AlertBootstrap disappear={false} />

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
                  backgroundUrl && backgroundUrl !== ""
                    ? {
                        background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), center / cover no-repeat url(${backgroundUrl}) `,
                        color: "white",
                      }
                    : null
                }
              >
                <CameraIcon
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
                  locationValue={
                    props.data ? formik.initialValues.location : ""
                  }
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
              <p>
                {formik.values.description.length}/{MAXVALUE}
              </p>
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
                selectedValues={selectedValue}
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
                value={
                  props.data
                    ? convertDateWithTime(props.data.startTime)
                    : formik.values.startTime
                }
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
                value={
                  props.data
                    ? convertDateWithTime(props.data.endTime)
                    : formik.values.endTime
                }
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
                    checked={freePrice}
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
            {props.isEdit ? (
              <div className="buttonsContainer">
                <Button
                  type="submit"
                  onClick={() => setButtonState("Save and Publish")}
                  class="createButt"
                >
                  Save and Publish
                </Button>
                <Button
                  type="submit"
                  onClick={() => setButtonState("Save")}
                  class="createButt"
                >
                  Save
                </Button>
              </div>
            ) : (
              <Button type="submit" class="createButt">
                Create
              </Button>
            )}
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
        backgroundURL={backgroundUrl}
        eventPhotosURL={props.data && photosURL.length === 0 ? "" : photosURL}
        setPhotosId={setPhotosId}
      />
    </>
  );
};

export default Form;
