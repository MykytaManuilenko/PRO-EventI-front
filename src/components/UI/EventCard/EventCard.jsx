import React from "react";
import "./EventCard.scss";

const EventCard = (props) => {
  return (
    <div className="eventCard">
      <div
        className="imageCard"
        style={
          !props.isCanceled
            ? { background: `center / cover no-repeat url(${props.image})` }
            : {
                background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), center / cover no-repeat url(${props.image})`,
              }
        }
      >
        {props.isCanceled ? <p>Canceled</p> : null}
      </div>
      <div className="text">
        <p style={{ fontSize: "18px" }}>{props.title}</p>
        <p style={{ fontSize: "16px", color: "#8F909E" }}>{props.date}</p>
      </div>
    </div>
  );
};

export default EventCard;
