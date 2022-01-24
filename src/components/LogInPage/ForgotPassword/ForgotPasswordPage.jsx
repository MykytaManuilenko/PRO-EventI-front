import React, { useState } from "react";
import Input from "../../UI/Input/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "../../../utils/axiosInstance";
import "./ForgotPasswordPage.scss";
import Button from "../../UI/Button/Button";
import { Alert } from "react-bootstrap";

const ForgotPasswordPage = () => {
  const [error, setError] = useState({ state: false, message: "" });
  const [success, setSuccess] = useState({ state: false, message: "" });
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email is invalid")
        .required("Field is required"),
    }),
    onSubmit: () => {
      const data = {
        email: formik.values.email,
      };
      axiosInstance
        .post(`/api/confirmations/password?email=${formik.values.email}`)
        .then((res) => {
          console.log("res :>> ", res);
          setSuccess({ state: true, message: "Check your email :)" });
        })
        .catch((err) => {
          console.log("err :>> ", err.response.data.message);
          setError({ state: true, message: err.response.data.message });
        });
    },
  });
  return (
    <>
      {error.state ? (
        <Alert
          className="allertError"
          variant="danger"
          dismissible
          onClose={() => setError(false)}
        >
          {error.message}
        </Alert>
      ) : null}

      {success.state ? (
        <Alert
          className="allertError"
          variant="success"
          dismissible
          onClose={() => setSuccess({ state: false, message: "" })}
        >
          {success.message}
        </Alert>
      ) : null}

      <div
        style={{
          backgroundImage: "url(./Background.svg)",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          width: "100%",
        }}
      >
        <div className="forgotPasswordContainer">
          <form
            noValidate
            onSubmit={formik.handleSubmit}
            className="forgotPasswordForm"
          >
            <p className="title">Reset Password</p>
            <div className="inputContainer">
              <Input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                name="email"
                type="text"
                placeholder="E-mail"
                touched={formik.touched.email}
                errors={formik.errors.email}
                labelName="E-mail*"
              />
            </div>

            <Button type="submit" class="resetButton">
              Reset password
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
