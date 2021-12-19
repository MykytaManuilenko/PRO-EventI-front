import React, { useState, useEffect } from "react";
import "./RegisterPage.scss";
import Button from "../UI/Button/Button";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { registrationUser } from "../../redux/actions/auth";
import { useSelector, useDispatch } from "react-redux";
import { Alert } from "react-bootstrap";
import { uiActions } from "../../redux/slices/ui";
import Multiselect from "multiselect-react-dropdown";
import getEventTypes from "../../api/services/User";

const RegisterPage = () => {
  const Error = useSelector((state) => state.UI.errRegister);
  const Success = useSelector((state) => state.UI.successRegister);
  const isError = useSelector((state) => state.UI.isErrReg);
  const isSuccess = useSelector((state) => state.UI.isSucReg);
  const [selectedValue, setSelectedVal] = useState("");
  const [types, setTypes] = useState([]);
  const [show, setShow] = useState(true);

  const regexpPhonePL =
    /^(?:(?:(?:\+|00)?48)|(?:\(\+?48\)))?(?:1[2-8]|2[2-69]|3[2-49]|4[1-8]|5[0-9]|6[0-35-9]|[7-8][1-9]|9[145])\d{7}$/;
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      birthDate: "",
      phone: "",
      eventTypes: [""],
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
      phone: Yup.string().matches(regexpPhonePL, "Invalid phone number"),
    }),
    onSubmit: (values) => {
      const data = {
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        birthDate: values.birthDate,
        phone: values.phone,
        eventTypes: selectedValue,
        // eventTypes: ["music", "dance"],
      };
      console.log("data :>> ", data);
      if (selectedValue.length !== 0) {
        const mapValue = [];
        selectedValue.map((value) => {
          mapValue.push(value.name);
        });
        console.log("mapValue :>> ", mapValue);
        data.eventTypes = mapValue;
      } else {
        data.eventTypes = selectedValue.name;
      }
      dispatch(registrationUser(data));
    },
  });

  useEffect(() => {
    getEventTypes("/api/events/type")
      .then((response) => {
        console.log("response :>> ", response.data);
        setTypes(response.data);
      })
      .catch((err) => console.log("errAAA :>> ", err));
  }, []);
  return (
    <div
      className="regPage"
      style={{ backgroundImage: "url(./Background.svg)" }}
    >
      {isError ? (
        <Alert
          className="allertError"
          variant="danger"
          onClose={() => {
            dispatch(uiActions.unsetErrorRegister(""));
            setShow(false);
          }}
          dismissible
        >
          {Error.message}
        </Alert>
      ) : null}

      {isSuccess ? (
        <Alert
          className="allertSuccess"
          variant="success"
          onClose={() => {
            dispatch(uiActions.unsetSuccessRegister(""));
            setShow(false);
          }}
          dismissible
        >
          {Success.message}
        </Alert>
      ) : null}
      <div className="registerContain">
        <form className="regForm" onSubmit={formik.handleSubmit} noValidate>
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
                placeholder="firstName"
                className="inputName"
              />
              <label className="labels">First Name *</label>
              {formik.touched.firstName && formik.errors.firstName ? (
                <p className="errorText">{formik.errors.firstName}</p>
              ) : null}
            </div>

            <div className="inputSurnameCont">
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
                name="lastName"
                placeholder="lastName"
                type="text"
                className="inputSurname"
              />
              <label className="labels">Surname *</label>
              {formik.touched.lastName && formik.errors.lastName ? (
                <p className="errorText">{formik.errors.lastName}</p>
              ) : null}
            </div>
          </div>

          <div className="secondRow">
            <div className="birthInputCont">
              <input
                type="date"
                required
                className="birthInput"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.birthDate}
                name="birthDate"
                placeholder="birthDate"
              />
              <label className="labels">Birthdate *</label>
              {formik.touched.birthDate && formik.errors.birthDate ? (
                <p className="errorText">{formik.errors.birthDate}</p>
              ) : null}
            </div>

            <div className="telephoneContain">
              <input
                type="text"
                required
                className="telephoneInput"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                name="phone"
                placeholder="phone"
              />
              <label className="labels">Telephone number</label>
              {formik.touched.phone && formik.errors.phone ? (
                <p className="errorText">{formik.errors.phone}</p>
              ) : null}
            </div>
          </div>

          <div className="typeSelector">
            <Multiselect
              onRemove={function noRefCheck() {}}
              onSearch={function noRefCheck() {}}
              onSelect={(e) => setSelectedVal(e)}
              onKeyPressFn={function noRefCheck() {}}
              placeholder="Type"
              displayValue="name"
              closeOnSelect={false}
              selectionLimit={2}
              options={types}
              style={{
                searchBox: {
                  border: "none",
                  borderBottom: "1px solid #fcc117",
                  borderRadius: "0",
                },
                chips: {
                  backgroundColor: "rgba(167, 169, 163, 0.41)",
                  color: "#0C0D2C",
                },
              }}
            />
          </div>

          <div className="emailContain">
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              name="email"
              type="text"
              required
              className="emailInput"
              autoComplete="off"
              placeholder="email"
            />
            <label className="labels">Email *</label>
            {formik.touched.email && formik.errors.email ? (
              <p className="errorText">{formik.errors.email}</p>
            ) : null}
          </div>

          <div className="passContainer">
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              required
              name="password"
              type="password"
              className="passwordInput"
              placeholder="password"
            />
            <label className="labels">Password</label>
            {formik.touched.password && formik.errors.password ? (
              <p className="errorText">{formik.errors.password}</p>
            ) : null}
          </div>

          <div className="buttContainer">
            <Button type="submit" class="RegButt">
              Register
            </Button>
            <p className="redirectLog">
              Already a member? <Link to="/login">Log In</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
