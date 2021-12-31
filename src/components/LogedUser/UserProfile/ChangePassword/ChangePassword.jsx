import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import GoBack from "../../../UI/GoBack/GoBack";
import Input from "../../../UI/Input/Input";
import "./ChangePassword.scss";
import Button from "../../../UI/Button/Button";
import axiosInstance from "../../../../utils/axiosInstance";
import { useHistory } from "react-router-dom";

const ChangePassword = () => {
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string()
        .required("Field is required")
        .min(8, "The password should contains of min. 8 symbols")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
      newPassword: Yup.string()
        .required("Field is required")
        .min(8, "The password should contains of min. 8 symbols")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    }),
    onSubmit: (values) => {
      const data = {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      };

      axiosInstance
        .patch("/api/users/me/password", data)
        .then((response) => {
          console.log("response :>> ", response);
          history.push("/userProfile");
        })
        .catch((err) => {
          console.log("err :>> ", err);
        });
    },
  });
  return (
    <>
      <GoBack />
      <div className="changePasswordPage">
        <div className="changePasswordContainer">
          <p className="title">Change Password</p>
          <form
            onSubmit={formik.handleSubmit}
            noValidate
            className="passwordForm"
          >
            <Input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.oldPassword}
              name="oldPassword"
              type="password"
              placeholder="oldPassword"
              touched={formik.touched.oldPassword}
              errors={formik.errors.oldPassword}
              labelName="Old Password*"
              className="password"
            />
            <Input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPassword}
              name="newPassword"
              type="password"
              placeholder="newPassword"
              touched={formik.touched.newPassword}
              errors={formik.errors.newPassword}
              labelName="New Password*"
              className="password"
            />

            <Button type="submit" class="saveButton">
              Save
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};
export default ChangePassword;
