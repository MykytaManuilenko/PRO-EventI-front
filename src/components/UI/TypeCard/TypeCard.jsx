import React from "react";
import "./TypeCard.scss";

const TypeCard = (props) => {
  return (
    <div className="typeContainer" key={props.index && props.index}>
      <p>{props.typeName}</p>
    </div>
  );
};

export default TypeCard;
