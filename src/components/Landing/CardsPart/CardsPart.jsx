import React from "react";
import { Link } from "react-router-dom";
import Button from "../../UI/Button/Button";
import Card from "../../UI/Card/Card";
import CardSlider from "../CardSlider/CardSlider";
import "./CardsPart.scss";
import { convertData } from "../../../utils/convertDate";

const CardsPart = (props) => {
  return (
    <div className="CardPart">
      <div className="TitlePart">
        <p className="Title">Popular events</p>
        <hr className="Line" />
      </div>
      <CardSlider events={props.events} />

      <Button class="ShowButton">Show all</Button>

      <div className="TitlePart">
        <p className="Title">Upcoming events</p>
        <hr className="Line" />
      </div>

      <div className="CardsContainer">
        {props.events &&
          props.events.map((event) => {
            return (
              <Card
                key={event.eventId}
                image={event.backgroundUrl}
                name={event.title}
                date={convertData(event.startTime)}
                className="nonAuthenticated"
              />
            );
          })}
      </div>
      <Link to="/allEvents">
        <Button class="ShowButton">Show all</Button>
      </Link>
    </div>
  );
};

export default CardsPart;
