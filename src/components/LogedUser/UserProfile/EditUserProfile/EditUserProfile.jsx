import React, { useState } from "react";
import { useEffect } from "react";
import axiosInstance from "../../../../utils/axiosInstance";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./EditUserProfile.scss";
import Input from "../../../UI/Input/Input";
import { useHistory } from "react-router-dom";
import Button from "../../../UI/Button/Button";
import GoBack from "../../../UI/GoBack/GoBack";

const EditUserProfile = () => {
  const [userData, setUserData] = useState();
  const history = useHistory();
  useEffect(() => {
    axiosInstance
      .get("/api/users/me")
      .then((res) => {
        console.log("res :>> ", res);
        setUserData(res.data);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: `${userData && userData.firstName}`,
      lastName: `${userData && userData.lastName}`,
      phone: `${userData && userData.phone}`,
      birthDate: "",
      country: {},
      city: {},
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(2, "Must be at least 2 characters")
        .max(20, "Must be 20 characters ir less")
        .required("Field is required"),
    }),
    onSubmit: () => {
      const data = {
        firstName: formik.values.firstName,
        lastName: formik.values.lastName,
        phone: formik.values.phone,
        birthDate: "2000-05-06",
      };

      axiosInstance
        .put("/api/users/me", data)
        .then((res) => {
          console.log("res :>> ", res);
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
      <div className="editProfileContainer">
        <div className="userInfoContainer">
          <form onSubmit={formik.handleSubmit} noValidate>
            <div className="firstRow">
              <div className="choosePhotoButton">
                <img
                  alt=""
                  src="../camera_icon.svg"
                  style={{
                    height: "50px",
                    width: "60px",
                    marginBottom: "10px",
                  }}
                />
              </div>
              <Input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
                name="firstName"
                type="text"
                placeholder="firstName"
                touched={formik.touched.firstName}
                errors={formik.errors.firstName}
                labelName="First Name"
                className="editInput"
              />
              <Input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
                name="lastName"
                type="text"
                placeholder="lastName"
                touched={formik.touched.lastName}
                errors={formik.errors.lastName}
                labelName="Last Name"
                className="editInput"
              />
            </div>
            <div className="secondRow">
              <Input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.birthDate}
                name="birthDate"
                type="date"
                placeholder="birthDate"
                touched={formik.touched.birthDate}
                errors={formik.errors.birthDate}
                labelName="Birthdate"
                className="editInput"
              />
              <Input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                name="phone"
                type="text"
                placeholder="phone"
                touched={formik.touched.phone}
                errors={formik.errors.phone}
                labelName="Phone number"
                className="editInput"
              />
            </div>
            <Button type="submit" class="SaveButton">
              Save
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditUserProfile;
