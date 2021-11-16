import React, { useEffect, useState } from "react";
import "./EventsPage.scss";
import { Link } from "react-router-dom";
import Button from "../../UI/Button/Button";
import axiosInstance from "../../../utils/axiosInstance";
import Card from "../../UI/Card/Card";

const EventsPage = () => {
  const [events, setEvents] = useState();
  useEffect(() => {
    axiosInstance
      .get("/api/events", { params: { limit: 10 } })
      .then((res) => {
        console.log("res :>> ", res);
        setEvents(res.data);
        console.log("res.data :>> ", res.data);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  }, []);

  const convertData = (data) => {
    const dataNew = new Date(data);
    const year = dataNew.getFullYear();
    const month = dataNew.getMonth() + 1;
    const day = dataNew.getDate();
    let monthName = "";

    switch (month) {
      case 1:
        monthName = "Jan";
        break;
      case 2:
        monthName = "Feb";
        break;
      case 3:
        monthName = "Mar";
        break;
      case 4:
        monthName = "Apr";
        break;
      case 5:
        monthName = "May";
        break;
      case 6:
        monthName = "Jun";
        break;
      case 7:
        monthName = "Jul";
        break;
      case 8:
        monthName = "Aug";
        break;
      case 9:
        monthName = "Sept";
        break;
      case 10:
        monthName = "Oct";
        break;
      case 11:
        monthName = "Nov";
        break;
      case 12:
        monthName = "Dec";
        break;
    }

    return day + " " + monthName + ", " + year;
  };
  return (
    <>
      <div className="containerEventPage">
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
                  className="CardImage"
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
