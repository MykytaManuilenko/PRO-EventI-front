import React, { useState } from "react";
import Button from "../UI/Button/Button";
import "./LogInPage.scss";
import { Link, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { logInUser } from "../../redux/actions/auth";
import { uiActions } from "../../redux/slices/ui";
import { Alert } from "react-bootstrap";

const LogInPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isErrorLogIn = useSelector((state) => state.UI.isErrLogIn);
  const Error = useSelector((state) => state.UI.errLogIn);
  const [show, setShow] = useState(true);

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
      {isErrorLogIn ? (
        <Alert
          className="allertError"
          variant="danger"
          onClose={() => {
            dispatch(uiActions.unsetErrorLogIn(""));
            setShow(false);
          }}
          dismissible
        >
          {Error.message}
        </Alert>
      ) : null}
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
              placeholder="email"
              name="email"
            />
            <label className="labels">User name</label>
            {formik.touched.email && formik.errors.email ? (
              <p className="errorText">{formik.errors.email}</p>
            ) : null}
          </div>
          <div className="inputContPass">
            <input
              type="password"
              className="passInput"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              placeholder="pass"
              name="password"
            />
            <label className="labels">Password</label>
            {formik.touched.password && formik.errors.password ? (
              <p className="errorText">{formik.errors.password}</p>
            ) : null}
          </div>

          <div className="forgetContainer">
            <p className="forget">Forgot Password?</p>
          </div>

          <div className="buttCont">
            <Button class="LogInButt" type="submit">
              Log in
            </Button>
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
