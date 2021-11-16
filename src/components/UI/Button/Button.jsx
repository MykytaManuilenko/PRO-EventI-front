import React from "react";
import "./Button.scss";
const Button = (props) => (
  <button
    type={props.type === "" ? props.type : ""}
    className={["ButtonStyle", props.class].join(" ")}
    onClick={props.onClick}
  >
    <p>{props.children}</p>
  </button>
);

export default Button;
