import React from "react";
import "./TypeCard.scss";

const TypeCard = (props) => {
  return (
    <div className="typeContainer" key={props.index && props.index}>
      <p>{props.typeName}</p>
      {props.showMultiSelect && (
        <button className="deleteButton" onClick={props.onDelete}>
          <img src="./cancel.svg" alt=""></img>
        </button>
      )}
    </div>
  );
};

export default TypeCard;
