import React from "react";
import "./Button.scss";
const Button = (props) => (
  <button
    type={props.type === "" ? props.type : ""}
    className={["ButtonStyle", props.class].join(" ")}
    onClick={props.onClick}
    disabled={props.disabled}
  >
    <p>{props.children}</p>
  </button>
);

export default Button;
