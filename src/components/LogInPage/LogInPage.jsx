import React, { useState } from "react";
import Button from "../UI/Button/Button";
import "./LogInPage.scss";
import { Link, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { logInUser } from "../../redux/actions/auth";

const LogInPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email is invalid")
        .required("Field is required"),
      password: Yup.string().required("Field is required"),
    }),
    onSubmit: (values) => {
      const data = {
        email: formik.values.email,
        password: formik.values.password,
      };
      dispatch(logInUser(data, history));
    },
  });

  return (
    <div
      className="logPage"
      style={{ backgroundImage: "url(./Background.svg)" }}
    >
      <div className="LogInContainer">
        <form className="logInForm" onSubmit={formik.handleSubmit}>
          <p className="title">Login to your account</p>
          <div className="inputContName">
            <input
              type="text"
              className="nameInput"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              name="email"
            />
            <label className="labels">User name</label>
            {formik.touched.email && formik.errors.email ? (
              <p>{formik.errors.email}</p>
            ) : null}
          </div>
          <div className="inputContPass">
            <input
              type="password"
              className="passInput"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              name="password"
            />
            <label className="labels">Password</label>
            {formik.touched.password && formik.errors.password ? (
              <p>{formik.errors.password}</p>
            ) : null}
          </div>

          <div className="forgetContainer">
            <p className="forget">Forgot Password?</p>
          </div>

          <div className="buttCont">
            {/* <Button class="LogInButt">Log in</Button> */}
            <button type="submit">LogIn</button>
          </div>
        </form>

        <p className="accountText">
          Don't have account? <Link to="/registration">Click here</Link>
        </p>
      </div>
    </div>
  );
};

export default LogInPage;
