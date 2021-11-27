import React from "react";
import "./EventCard.scss";

const EventCard = (props) => {
  return (
    <div className="eventCard">
      <img src={props.image} alt="" className="imageCard" />
      <div className="text">
        <p style={{ fontSize: "18px" }}>{props.title}</p>
        <p style={{ fontSize: "16px", color: "#8F909E" }}>{props.date}</p>
      </div>
    </div>
  );
};

export default EventCard;
