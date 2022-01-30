import React from "react";
import Arrow from "../Arrow/Arrow";
import "./Dropdown.scss";

const Dropdown = (props) => {
  console.log("filteredValues :>> ", props.filteredValues);
  return (
    <div className="Dropdown">
      <div className="inputCont">
        <input
          value={
            props.filteredValues.length !== 0
              ? `${props.filteredValues.length} Types`
              : ""
          }
          name="type"
          type="text"
          placeholder="Type"
          className={props.isAuth ? "inputName" : "notAuthInputName"}
        />
        <Arrow
          isOpen={props.open}
          onClick={props.clicked}
          isAuth={props.isAuth}
        />
        <label className="labels">Type</label>
      </div>

      {props.open && (
        <ul className="FilterList">
          {props.types.map((type) => {
            return (
              <li key={type.eventTypeId}>
                <input
                  value={type.name}
                  type="checkbox"
                  id={type.eventTypeId}
                  className="Check"
                  checked={
                    props.filteredValues.length !== 0 &&
                    props.filteredValues.includes(type.name)
                  }
                  onChange={(e) => props.handleChange(e.target.value)}
                />
                {type.name}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
