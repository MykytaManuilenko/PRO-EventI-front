import React, { useEffect, useState } from "react";
import "./EventsPage.scss";
import { Link, useHistory } from "react-router-dom";
import Button from "../../UI/Button/Button";
import axiosInstance from "../../../utils/axiosInstance";
import Card from "../../UI/Card/Card";
import SearchPart from "../../Landing/SearchPart/SearchPart";
import { convertData } from "../../../utils/convertData";

const EventsPage = () => {
  const [events, setEvents] = useState();
  const history = useHistory();
  useEffect(() => {
    axiosInstance
      .get("/api/events")
      .then((res) => {
        console.log("res :>> ", res);
        setEvents(res.data);
        console.log("events page :>> ", res.data);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  }, []);

  return (
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
                  onClick={() => history.push(`/events/${event.eventId}`)}
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
