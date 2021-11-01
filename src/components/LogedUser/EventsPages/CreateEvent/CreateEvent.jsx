import React from "react";
import { useFormik } from "formik";
import eventStyle from "./CreateEvent.module.scss";
import UserNav from "../../../Navigation/UserNav/UserNav";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";

const CreateEvent = () => {
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      amount: "",
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
      amount: Yup.number()
        .test(
          "Is positive?",
          "The number must be greater than 0!",
          (value) => value > 0
        )
        .required("Field is required"),
    }),
  });
  let history = useHistory();

  return (
    <>
      <div className={eventStyle.createEventCont}>
        <div>
          <button onClick={() => history.goBack()}>Go back</button>
        </div>
        <div className={eventStyle.container}>
          <form action="" className={eventStyle.createForm}>
            <p className={eventStyle.title}>Create new event</p>
            <hr />

            <div className={eventStyle.topPart}>
              <div className={eventStyle.inputTitle}>
                <input
                  type="text"
                  className={eventStyle.nameInput}
                  name="title"
                />
                <label className={eventStyle.labels}>Title*</label>
              </div>

              <div className={eventStyle.inputType}>
                <input
                  type="text"
                  className={eventStyle.typeInput}
                  name="type"
                />
                <label className={eventStyle.labels}>Type*</label>
              </div>
            </div>

            <div className={eventStyle.descriptionInput}>
              <label>Description*</label>
              <input
                type="text"
                className={eventStyle.inputDescr}
                name="description"
              />
            </div>

            <div className={eventStyle.gridContainer}>
              <div className={eventStyle.dateInput}>
                <input
                  type="date"
                  className={eventStyle.inputDate}
                  name="date"
                />
                <label className={eventStyle.labels}>Date</label>
              </div>

              <div className={eventStyle.timeInput}>
                <input
                  type="time"
                  className={eventStyle.inputTime}
                  name="time"
                />
                <label className={eventStyle.labels}>Time</label>
              </div>

              <div className={eventStyle.locationInput}>
                <input
                  type="text"
                  className={eventStyle.inputLocation}
                  name="location"
                />
                <label className={eventStyle.labels}>Location</label>
              </div>

              <div className={eventStyle.priceInput}>
                <input
                  type="text"
                  className={eventStyle.inputPrice}
                  name="price"
                />
                <label className={eventStyle.labels}>Price</label>
              </div>

              <div className={eventStyle.amountInput}>
                <input
                  type="text"
                  className={eventStyle.inputAmount}
                  name="amount"
                />
                <label className={eventStyle.labels}>
                  Maximum amount of people
                </label>
              </div>
            </div>

            <button type="submit">Create</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateEvent;
