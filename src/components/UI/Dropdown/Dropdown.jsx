import React, { useState } from "react";
import Arrow from "../Arrow/Arrow";
import "./Dropdown.scss";

const Dropdown = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="Dropdown">
      <div
        className={"Container" + (open ? " activeFilter" : "")}
        onClick={() => setOpen(!open)}
      >
        <p className="ClickableText">
          {props.children} <Arrow isOpen={open} />
        </p>
      </div>

      {open && (
        <ul className="FilterList">
          {props.types.map((type, index) => {
            return (
              <li key={index}>
                <input type="checkbox" className="Check" />
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
