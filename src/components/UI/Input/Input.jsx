import React from "react";
import "./Input.scss";

const Input = (props) => {
  return (
    <div className="inputCont">
      <input
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        className={["inputName", props.className].join(" ")}
        disabled={props.disabled}
      />
      <label className="labels">{props.labelName}</label>

      {!props.disabled ? (
        props.touched && props.errors ? (
          <p className="errorText">{props.errors}</p>
        ) : null
      ) : null}
    </div>
  );
};

export default Input;
