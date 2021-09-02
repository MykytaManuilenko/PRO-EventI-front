import React, { useState } from "react";
import NavBar from "../Navigation/NavBar/NavBar";
import "./LogInPage.scss";
import { Link } from "react-router-dom";

const LogInPage = () => {
  const [userName, setUsername] = useState("");

  return (
    <div
      className="logPage"
      style={{ backgroundImage: "url(./Background.svg)" }}
    >
      <NavBar cname="navigation"></NavBar>
      <div className="mainPart">
        <div className="LogInContainer">
          <form className="logInForm">
            <p className="title">Login to your account</p>
            <div class="inputContName">
              <input
                type="text"
                className="nameInput"
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
              <label className="labels">User name</label>
            </div>
            <div class="inputContPass">
              <input type="text" className="passInput" />
              <label className="labels">Password</label>
            </div>

            <div className="forgetContainer">
              <p className="forget">Forgot Password?</p>
            </div>
          </form>

          <p className="accountText">
            Don't have account? <Link to="/registration">Click here</Link>
          </p>
        </div>

        {/* <h1>jfjfjf</h1> */}
      </div>
    </div>
  );
};

export default LogInPage;
