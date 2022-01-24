import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import "./History.scss";
import Card from "../../UI/Card/Card";
import { convertData } from "../../../utils/convertDate";
import Spinner from "react-bootstrap/Spinner";

const HistoryBookedEvent = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [archivedEvent, setArchivedEvent] = useState();

  useEffect(() => {
    window.scrollTo(0, props.scrollPosition);
    axiosInstance
      .get("api/events/my/book", { params: { status: "FINISHED" } })
      .then((res) => {
        setArchivedEvent(res.data);
        console.log("resHistory :>> ", res);
        setIsLoading(false);
      })
      .catch((err) => console.log("err :>> ", err));
  }, []);

  if (isLoading) {
    return <Spinner animation="border" variant="warning" />;
  }
  return (
    <div className="containerForHistoryPage">
      <div className="header">
        <p className="headerText">History of booked events</p>
      </div>
      <div className="archivedEventGridContainer">
        {archivedEvent.length > 0 ? (
          archivedEvent.map((event) => {
            return (
              <Card
                image={event.backgroundUrl}
                name={event.title}
                eventId={event.eventId}
                key={event.eventId}
                isLiked={event.isLiked}
                date={convertData(event.startTime)}
                isCanceled={event.canceled}
              />
            );
          })
        ) : (
          <p>No archived event :(</p>
        )}
      </div>
    </div>
  );
};

export default HistoryBookedEvent;
