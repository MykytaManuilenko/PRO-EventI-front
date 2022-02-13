import React from "react";
import "./Landing.scss";
import {
  HomePageBackground,
  FirstStepInstruction,
} from "../../assets/icons/index";
import Button from "../UI/Button/Button";
import { useHistory } from "react-router-dom";
import second from "../../assets/bbb.png";
import ticket from "../../assets/ticket.png";
import fourthInstructions from "../../assets/fourthInstructions.png";

const Landing = () => {
  const history = useHistory();
  return (
    <div className="landingContainer">
      <div className="topLandingContainer">
        <div className="title">
          <p style={{ fontSize: "60px" }} className="p">
            Spend <b style={{ color: "#8698e9" }}>your</b> <br />
            time <b style={{ color: "#8698e9" }}>with us</b>
          </p>
          <p style={{ width: "50%" }} className="p">
            Find new acquaintances, take a break from work and have fun together
            with other people!
          </p>
          <Button class="joinUsButton" onClick={() => history.push("/login")}>
            Join us
          </Button>
        </div>
        <div className="backgroundImage">
          <HomePageBackground className="icon" />
        </div>
      </div>
      <div className="instructionContainer">
        <p className="titleInstruction">How our service works?</p>
        <div className="stepsContainer">
          <div className="steps">
            <FirstStepInstruction className="stepIcon" />
            <div className="textContainer">
              <p style={{ fontSize: "120px", color: "#8698e9", opacity: 0.5 }}>
                1
              </p>
              <p style={{ textAlign: "left" }}>
                Search for any event using search bar. Then <br />
                choose one that you liked most.
              </p>
            </div>
          </div>
          <div className="steps">
            <div className="textContainer">
              <p style={{ fontSize: "120px", color: "#8698e9", opacity: 0.5 }}>
                2
              </p>
              <p style={{ textAlign: "left" }}>
                Read more about the event on description page.
              </p>
            </div>
            <img
              src={second}
              alt="second instructions"
              style={{ width: "450px" }}
            />
          </div>
          <div className="steps">
            <img
              src={fourthInstructions}
              alt="second instructions"
              style={{ width: "400px" }}
            />
            <div className="textContainer">
              <p style={{ fontSize: "120px", color: "#8698e9", opacity: 0.5 }}>
                3
              </p>
              <p style={{ textAlign: "left" }}>
                Book the place on the event right now. If the event <br /> is
                paid, so pay right here!
              </p>
            </div>
          </div>
          <div className="steps">
            <div className="textContainer">
              <p style={{ fontSize: "120px", color: "#8698e9", opacity: 0.5 }}>
                4
              </p>
              <p style={{ textAlign: "left" }}>Get your ticket! </p>
            </div>
            <img
              src={ticket}
              alt="second instructions"
              style={{ width: "450px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
