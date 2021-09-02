import React from "react";
import NavBar from "../Navigation/NavBar/NavBar";
import "./RegisterPage.scss";
import Button from "../UI/Button/Button";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <div
      className="regPage"
      style={{ backgroundImage: "url(./Background.svg)" }}
    >
      <NavBar cname="navigation"></NavBar>

      <div className="mainReg">
        <div className="registerContain">
          <form className="regForm">
            <p className="title">Create your account</p>

            <div className="firstRow">
              <div className="placePhoto"></div>
              <div className="inputNameCont">
                <input type="text" className="inputName" />
                <label className="labels">First Name *</label>
              </div>
              <div className="inputSurnameCont">
                <input type="text" className="inputSurname" />
                <label className="labels">Surname *</label>
              </div>
            </div>

            <div className="secondRow">
              <div className="birthInputCont">
                <input type="text" className="birthInput" />
                <label className="labels">Birthdate *</label>
              </div>
              <div className="sexInputCont">
                <input type="text" className="sexInput" />
                <label className="labels">Sex</label>
              </div>
            </div>

            <div className="emailContain">
              <input type="text" className="emailInput" />
              <label className="labels">Email *</label>
            </div>

            <div className="telephoneContain">
              <input type="text" className="telephoneInput" />
              <label className="labels">Telephone number</label>
            </div>

            <div className="passContainer">
              <input type="text" className="passwordInput" />
              <label className="labels">Password</label>
            </div>

            <div className="buttContainer">
              <Button class="LogInButt">Register</Button>
              <p className="redirectLog">
                Already a member? {" "}<Link to="/login">Log In</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
