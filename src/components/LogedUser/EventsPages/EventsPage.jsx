import React, { useEffect, useState } from "react";
import "./EventsPage.scss";
import { Link } from "react-router-dom";
import Button from "../../UI/Button/Button";
import axiosInstance from "../../../utils/axiosInstance";
import Card from "../../UI/Card/Card";
import SearchPart from "../../Landing/SearchPart/SearchPart";
import { convertData } from "../../../utils/convertData";

const EventsPage = () => {
  const [events, setEvents] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/api/events")
      .then((res) => {
        console.log("res :>> ", res);
        setEvents(res.data);
        setIsLoading(false);
        console.log("events page :>> ", res.data);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  }, []);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <>
      <div className="containerEventPage">
        <SearchPart className="SearchPartLogIn" />
        <p className="title">All Events</p>
        <div className="gridEventCont">
          {events &&
            events.map((event) => {
              return (
                <Card
                  key={event.eventId}
                  image={event.backgroundUrl}
                  name={event.title}
                  date={convertData(event.startTime)}
                  eventId={event.eventId}
                  isLiked={event.isLiked}
                  price={event.price}
                />
              );
            })}
        </div>
        <Link to="/createEvent">
          <Button class="addEventButt">Add Event</Button>
        </Link>
      </div>
    </>
  );
};

export default EventsPage;
