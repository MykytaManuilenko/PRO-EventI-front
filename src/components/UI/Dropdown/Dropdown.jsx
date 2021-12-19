import React from "react";
import Arrow from "../Arrow/Arrow";
import "./Dropdown.scss";

const Dropdown = (props) => {
  return (
    <div className="Dropdown">
      <div
        className={"Container" + (props.open ? " activeFilter" : "")}
        onClick={props.clicked}
      >
        <p className="ClickableText">
          {props.children} <Arrow isOpen={props.open} />
        </p>
      </div>

      {props.open && (
        <ul className="FilterList">
          {props.types.map((type, index) => {
            return (
              <li key={index}>
                <input
                  value={type}
                  type="checkbox"
                  className="Check"
                  onChange={(e) => props.handleChange(e.target.value)}
                />
                {type}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
