import React from "react";
import "./TypeCard.scss";
import { CancelIcon } from "../../../assets/icons";

const TypeCard = (props) => {
  return (
    <div
      // className="typeContainer"
      className={["typeContainer", props.class].join(" ")}
      key={props.index && props.index}
      style={props.outlined && { backgroundColor: "transparent" }}
    >
      <p style={props.outlined && { color: "white" }}>{props.typeName}</p>
      {props.showMultiSelect && (
        <button className="deleteButton" onClick={props.onDelete}>
          <CancelIcon className="cancelIcon" />
        </button>
      )}
    </div>
  );
};

export default TypeCard;
