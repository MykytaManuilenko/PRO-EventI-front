import React, { useState, useEffect } from "react";
import axiosInstance from "../../../../utils/axiosInstance";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./EditUserProfile.scss";
import Input from "../../../UI/Input/Input";
import { useHistory } from "react-router-dom";
import Button from "../../../UI/Button/Button";
import GoBack from "../../../UI/GoBack/GoBack";
import { CameraIcon } from "../../../../assets/icons";
import Loading from "../../../UI/Loading/Loading";
import { useDispatch } from "react-redux";
import { uiActions } from "../../../../redux/slices/ui";

const EditUserProfile = () => {
  const [userData, setUserData] = useState();
  const dispatch = useDispatch();
  const [file, setFile] = useState();
  const [previewAvatar, setPreviewAvatar] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  useEffect(() => {
    axiosInstance
      .get("/api/users/me")
      .then((res) => {
        console.log("res :>> ", res);
        setUserData(res.data);
        setPreviewAvatar(res.data.avatarUrl ? res.data.avatarUrl : "");
        setIsLoading(false);
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
      birthDate: `${userData && userData.birthDate}`,
      country: {},
      city: {},
      avatar: `${userData && userData.avatar}`,
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
        birthDate: formik.values.birthDate,
        country: "PL",
        city: "Warsaw",
        avatar: userData.avatar ? userData.avatar : "",
      };
      const formData = new FormData();
      formData.append("file", file);

      console.log("userData.avatarUrl :>> ", userData.avatarUrl);
      console.log("previewAvatar :>> ", previewAvatar);
      if (userData.avatarUrl === previewAvatar) {
        axiosInstance
          .put("/api/users/me", data)
          .then((res) => {
            dispatch(
              uiActions.openAlert({
                status: "success",
                message: "Your acount has been updated successfully!",
              })
            );
            history.push("/userProfile");
          })
          .catch((err) => {
            dispatch(
              uiActions.openAlert({
                status: "error",
                message: err.response.data.message,
              })
            );
            console.log("err :>> ", err);
          });
      } else {
        axiosInstance
          .post("/api/files", formData, { params: { type: "AVATAR" } })
          .then((res) => {
            console.log("res :>> ", res);
            data.avatar = res.data.fileId;
            axiosInstance
              .put("/api/users/me", data)
              .then((res) => {
                console.log("res :>> ", res);
                dispatch(
                  uiActions.openAlert({
                    status: "success",
                    message: "Your acount has been updated successfully!",
                  })
                );
                history.push("/userProfile");
              })
              .catch((err) => {
                dispatch(
                  uiActions.openAlert({
                    status: "error",
                    message: err.response.data.message,
                  })
                );
                console.log("err :>> ", err);
              });
          })
          .catch((err) => {
            console.log("err :>> ", err);
          });
      }
    },
  });

  const handleFile = (e) => {
    setFile(e.target.files[0]);
    setPreviewAvatar(URL.createObjectURL(e.target.files[0]));
  };
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <GoBack />
      <div className="editProfileContainer">
        <div className="userInfoContainer">
          <form onSubmit={formik.handleSubmit} noValidate>
            <div className="firstRow">
              <img
                src="../../../../assets/defaultAvatar.png"
                alt=""
                style={{ width: "30px", height: "30px" }}
              />
              <div
                className="choosePhotoButton"
                style={
                  previewAvatar
                    ? {
                        background: `center / cover no-repeat url(${previewAvatar}) `,
                      }
                    : null
                  // {
                  //   background: `center / cover no-repeat url('../../../../assets/defaultAvatar.png') `,
                  // }
                }
              >
                <input
                  type="file"
                  name="file"
                  accept="image/*"
                  multiple={false}
                  onChange={(e) => handleFile(e)}
                />
                <CameraIcon
                  style={{
                    height: "50px",
                    width: "60px",
                    marginBottom: "10px",
                  }}
                />
              </div>
              <div
                style={{
                  marginTop: "30px",
                  display: "flex",
                  width: "100%",
                  gap: "20px",
                }}
              >
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
