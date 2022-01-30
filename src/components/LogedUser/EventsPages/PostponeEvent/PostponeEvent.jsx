import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import Input from "../../../UI/Input/Input";
import "./PostponeEvent.scss";
import LocationAuto from "../../../UI/LocationAuto/LocationAuto";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../../utils/axiosInstance";
import { convertDateWithTime } from "../../../../utils/convertDate";
import GoBack from "../../../UI/GoBack/GoBack";
import Button from "../../../UI/Button/Button";
import Loading from "../../../UI/Loading/Loading";
import { useDispatch } from "react-redux";
import { uiActions } from "../../../../redux/slices/ui";
import AlertBootstrap from "../../../UI/Alert/AlertBootstrap";
import { useHistory } from "react-router-dom";

const PostponeEvent = () => {
  const { eventId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [eventDetail, setEventDetail] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [address, setAddress] = useState({
    country: "",
    city: "",
    street: "",
  });
  useEffect(() => {
    axiosInstance
      .get(`/api/events/${eventId}`)
      .then((res) => {
        console.log("res :>> ", res);
        setEventDetail(res.data);
        setAddress({
          country: res.data.address.country,
          city: res.data.address.city,
          street: res.data.address.street,
        });
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      postponeReason: "",
      startTime: eventDetail && eventDetail.startTime,
      endTime: eventDetail && eventDetail.endTime,
      location: address,
    },
    validationSchema: Yup.object({
      postponeReason: Yup.string()
        .min(10, "Must be at least 10 characters")
        .max(1000, "Must be max 1000 characters or less")
        .required("The field is required"),
    }),
    onSubmit: () => {
      console.log("Submitted");
      const data = {
        postponeReason: formik.values.postponeReason,
        startTime: formik.values.startTime,
        endTime: formik.values.endTime,
        address: {
          country: address.country,
          city: address.city,
          street: address.street,
        },
      };
      axiosInstance
        .post("/api/confirmations/event/postpone", data, {
          params: { eventId: eventId },
        })
        .then((res) => {
          dispatch(
            uiActions.openAlert({
              status: "success",
              message: "Your application successfully created!",
            })
          );
          history.goBack();
          console.log("resSendPostponeRequest :>> ", res);
        })
        .catch((err) => {
          dispatch(
            uiActions.openAlert({
              status: "error",
              message: err.response.data.message,
            })
          );
          console.log("errSendPostponeRequest :>> ", err);
        });
    },
  });
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <GoBack />
      <AlertBootstrap />
      <div className="postponeEventContainer">
        <p className="title">Create new event</p>
        <hr />
        <form
          className="postponeForm"
          onSubmit={formik.handleSubmit}
          noValidate
        >
          <div className="postponeReasonInput">
            <label>Reason for postponing the event*</label>
            <textarea
              className="postponeInput"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.postponeReason}
              name="postponeReason"
            />
            {formik.touched.postponeReason && formik.errors.postponeReason ? (
              <p className="errorText">{formik.errors.postponeReason}</p>
            ) : null}
          </div>
          <div className="secondLine">
            <Input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={convertDateWithTime(formik.values.startTime)}
              name="startTime"
              type="datetime-local"
              placeholder="startTime"
              touched={formik.touched.startTime}
              errors={formik.errors.startTime}
              labelName="Start Time*"
              className="inputContainer"
            />
            <Input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={convertDateWithTime(formik.values.endTime)}
              name="endTime"
              type="datetime-local"
              placeholder="endTime"
              touched={formik.touched.endTime}
              errors={formik.errors.endTime}
              labelName="End Time*"
              className="inputContainer"
            />
          </div>
          <div className="locationInput">
            <LocationAuto
              setAddress={setAddress}
              className="locationInput"
              labelClass="labels"
              locationValue={address}
            />
          </div>
          <Button type="submit" class="postponeButton">
            Postpone
          </Button>
        </form>
      </div>
    </>
  );
};

export default PostponeEvent;
