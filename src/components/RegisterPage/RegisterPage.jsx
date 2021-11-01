import React, { useState } from "react";
import NavBar from "../Navigation/NavBar/NavBar";
import "./RegisterPage.scss";
import Button from "../UI/Button/Button";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { registrationUser } from "../../redux/actions/auth";
import { useSelector, useDispatch } from "react-redux";
import { Alert } from "react-bootstrap";
import { uiActions } from "../../redux/slices/ui";

const RegisterPage = () => {
  const Error = useSelector((state) => state.UI.err);
  const Success = useSelector((state) => state.UI.success);
  const isError = useSelector((state) => state.UI.isErr);
  const isSuccess = useSelector((state) => state.UI.isSuc);

  const autoCloseAlert = () => {
    console.log("ERROR CLOSE :>> ");
    setTimeout(() => {
      dispatch(uiActions.unsetError());
      console.log("UNSET ERROR :>> ");
    }, 3000);
  };

  const dispatch = useDispatch();
  const registerHandler = (data) => {
    dispatch(registrationUser(data));
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(2, "Must be at least 2 characters")
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      lastName: Yup.string()
        .min(2, "Must be at least 2 characters")
        .max(20, "Must be 20 characters or less")
        .required("Field is required"),
      email: Yup.string()
        .email("Email is invalid")
        .required("Field is required"),
      password: Yup.string()
        .required("Field is required")
        .min(8, "The password should contains of min. 8 symbols")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    }),
    onSubmit: (values) => {
      const data = {
        email: formik.values.email,
        password: formik.values.password,
        firstName: formik.values.firstName,
        lastName: formik.values.lastName,
      };
      registerHandler(data);
    },
  });

  return (
    // <div
    //   className="regPage"
    //   style={{ backgroundImage: "url(./Background.svg)" }}
    // >
    /* <div className="allert">
            <Alert className="allertError" variant="danger" show={Error}>
              {Error.message}
            </Alert>
          </div> */

    <div
      className="regPage"
      style={{ backgroundImage: "url(./Background.svg)" }}
    >
      {isError ? (
        <div className="allert">
          <Alert className="allertError" variant="danger" show={Error}>
            {Error.message}
          </Alert>
        </div>
      ) : null}

      {isSuccess ? (
        <Alert
          className="allertSuccess"
          variant="success"
          show={autoCloseAlert}
        >
          {Success.message}
        </Alert>
      ) : null}
      <div className="registerContain">
        <form className="regForm" onSubmit={formik.handleSubmit}>
          <p className="title">Create your account</p>

          <div className="firstRow">
            <div className="placePhoto"></div>
            <div className="inputNameCont">
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
                name="firstName"
                type="text"
                className="inputName"
              />
              <label className="labels">First Name *</label>
              {formik.touched.firstName && formik.errors.firstName ? (
                <p>{formik.errors.firstName}</p>
              ) : null}
            </div>
            <div className="inputSurnameCont">
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
                name="lastName"
                type="text"
                className="inputSurname"
              />
              <label className="labels">Surname *</label>
              {formik.touched.lastName && formik.errors.lastName ? (
                <p>{formik.errors.lastName}</p>
              ) : null}
            </div>
          </div>

          {/* <div className="secondRow">
              <div className="birthInputCont">
                <input type="text" className="birthInput" />
                <label className="labels">Birthdate *</label>
              </div>
              <div className="sexInputCont">
                <input type="text" className="sexInput" />
                <label className="labels">Sex</label>
              </div>
            </div> */}

          <div className="emailContain">
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              name="email"
              type="text"
              className="emailInput"
            />
            <label className="labels">Email *</label>
            {formik.touched.email && formik.errors.email ? (
              <p>{formik.errors.email}</p>
            ) : null}
          </div>

          {/* <div className="telephoneContain">
              <input type="text" className="telephoneInput" />
              <label className="labels">Telephone number</label>
            </div> */}

          <div className="passContainer">
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              name="password"
              type="password"
              className="passwordInput"
            />
            <label className="labels">Password</label>
            {formik.touched.password && formik.errors.password ? (
              <p>{formik.errors.password}</p>
            ) : null}
          </div>

          <div className="buttContainer">
            {/* <Button type='submit' class="RegButt" 
              // clicked={handleRegister}
              >
                Register
              </Button> */}
            <button type="submit">Register</button>
            <p className="redirectLog">
              Already a member? <Link to="/login">Log In</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
    // </div>
  );
};

export default RegisterPage;
