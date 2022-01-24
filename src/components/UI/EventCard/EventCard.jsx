import React from "react";
import TypeCard from "../TypeCard/TypeCard";
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
        <div className="titleContainer">
          <p style={{ fontSize: "18px", marginRight: "15px" }}>{props.title}</p>
          <TypeCard
            typeName={props.status}
            class={
              props.status === "DRAFT"
                ? "eventStatus"
                : props.status === "PUBLISHED" && "eventStatusPublished"
            }
          />
        </div>

        <p style={{ fontSize: "16px", color: "#8F909E" }}>{props.date}</p>
      </div>
    </div>
  );
};

export default EventCard;
