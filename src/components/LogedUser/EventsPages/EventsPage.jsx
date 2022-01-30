import React, { useEffect, useState } from "react";
import "./EventsPage.scss";
import { Link } from "react-router-dom";
import Button from "../../UI/Button/Button";
import axiosInstance from "../../../utils/axiosInstance";
import Card from "../../UI/Card/Card";
import SearchPart from "../../Landing/SearchPart/SearchPart";
import { convertData } from "../../../utils/convertDate";
import { useLocation } from "react-router-dom";
import Loading from "../../UI/Loading/Loading";
import UserRecomendation from "./UserRecomendation";
import Search from "../../Landing/Search/Search";

const EventsPage = () => {
  const [events, setEvents] = useState();

  const [eventsCopy, setEventsCopy] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isFiltered, setIsFiltered] = useState(false);
  const location = useLocation();

  const { filtered } =
    location.state && location.state.filtered ? location.state : {};

  useEffect(() => {
    axiosInstance
      .get("/api/events")
      .then((res) => {
        console.log("resEvents :>> ", res);
        setEvents(res.data);
        setEventsCopy(res.data);
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
        <Search
          setIsFiltered={setIsFiltered}
          events={events}
          setEventsCopy={setEventsCopy}
          isAuth={true}
          className="eventsPageSearch"
        />
        {!isFiltered ? (
          <>
            <p className="title">Picked for you</p>
            <UserRecomendation events={events} />
          </>
        ) : null}
        <p className="title">All Events</p>
        <div className="gridEventCont">
          {events &&
            eventsCopy.map((event) => {
              return (
                <Card
                  key={event.eventId}
                  image={event.backgroundUrl}
                  name={event.title}
                  date={convertData(event.startTime)}
                  eventId={event.eventId}
                  isLiked={event.isLiked}
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
