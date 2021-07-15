import React from "react";
import "./Card.scss";

const Card = (props) => {
  return (
    <div className="Card">
      <div className="UpPart">
        <img src={props.image} alt="" className="CardImage" />
      </div>
      <div className="DownPart">
        <div className="TextContainer">
          <p className="EventName">{props.name}</p>
          <p className="EventDate">{props.date}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
