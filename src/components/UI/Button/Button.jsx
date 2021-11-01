import React from "react";
import "./Button.scss";
const Button = (props) => (
  <button
    type={props.type === "" ? props.type : ""}
    className={["ButtonStyle", props.class].join(" ")}
    onClick={props.clicked === "" ? (e) => props.clicked(e) : null}
  >
    {props.children}
  </button>
);

export default Button;
