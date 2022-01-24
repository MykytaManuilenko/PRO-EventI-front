import React, { useEffect, useState } from "react";
import "./EventsPage.scss";
import { Link } from "react-router-dom";
import Button from "../../UI/Button/Button";
import axiosInstance from "../../../utils/axiosInstance";
import Card from "../../UI/Card/Card";
import SearchPart from "../../Landing/SearchPart/SearchPart";
import { convertData } from "../../../utils/convertDate";
import { useLocation } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Loading from "../../UI/Loading/Loading";

const EventsPage = () => {
  const [events, setEvents] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  const { filtered } =
    location.state && location.state.filtered ? location.state : {};

  useEffect(() => {
    axiosInstance
      .get("/api/events")
      .then((res) => {
        console.log("resEvents :>> ", res);
        setEvents(res.data);
        setIsLoading(false);
        console.log("events page :>> ", res.data);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <div className="containerEventPage">
        <SearchPart
          cname="SearchPartLogIn"
          events={events}
          pathName={"/events"}
        />
        <p className="title">All Events</p>
        <div className="gridEventCont">
          {!filtered
            ? events &&
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
              })
            : filtered.map((event) => {
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
