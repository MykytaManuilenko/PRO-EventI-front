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
import Input from "../UI/Input/Input";

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
          <div className="containerForInputs">
            <Input
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder="email"
              name="email"
              labelName="Email"
              touched={formik.touched.email}
              errors={formik.errors.email}
            />

            <Input
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              placeholder="pass"
              name="password"
              labelName="Password"
              touched={formik.touched.password}
              errors={formik.errors.password}
              className="inputContPass"
            />
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
