import React from "react";
import Button from "../UI/Button/Button";
import "./LogInPage.scss";
import { Link, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { logInUser } from "../../redux/actions/auth";
import Input from "../UI/Input/Input";
import AlertBootstrap from "../UI/Alert/AlertBootstrap";

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
      console.log("data :>> ", data);
      dispatch(logInUser(data, history));
    },
  });

  return (
    <>
      <div className="logPage">
        <AlertBootstrap disappear />
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
              <p
                className="forget"
                onClick={() => history.push("/forgotPassword")}
              >
                Forgot Password?
              </p>
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
    </>
  );
};

export default LogInPage;
