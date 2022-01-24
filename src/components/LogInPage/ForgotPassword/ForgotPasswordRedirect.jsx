import React from "react";
import Input from "../../UI/Input/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "../../UI/Button/Button";
import axiosInstance from "../../../utils/axiosInstance";
import { useLocation, useHistory } from "react-router-dom";
import "./ForgotPasswordPage.scss";

const ForgotPasswordRedirect = () => {
  const location = useLocation();
  const history = useHistory();
  const params = location.search.slice(1).split("&");

  const hash = params[0].split("=")[1];
  const requestId = params[1].split("=")[1];

  //http://localhost:3000/confirm/password?hash=a659cc2f1b1c4aa4cf895840cfce6d0ef7bb1ee6&requestId=bf199451-b8c3-45da-a801-979dd5ad30bd
  const formik = useFormik({
    initialValues: { newPassword: "" },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .required("Field is required")
        .min(8, "The password should contains of min. 8 symbols")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    }),
    onSubmit: () => {
      axiosInstance
        .patch(`/api/confirmations/${requestId}/password?hash=${hash}`, {
          newPassword: formik.values.newPassword,
        })
        .then((res) => {
          console.log("res :>> ", res);
          history.push("/login");
        })
        .catch((err) => {
          console.log("err :>> ", err);
        });
    },
  });
  return (
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
        <form onSubmit={formik.handleSubmit} className="forgotPasswordForm">
          <p className="title">Reset Password</p>
          <div className="inputContainer">
            <Input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPassword}
              name="newPassword"
              type="password"
              placeholder="Password"
              touched={formik.touched.newPassword}
              errors={formik.errors.newPassword}
              labelName="Password*"
            />
          </div>

          <Button type="submit" class="resetButton">
            Change password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordRedirect;
