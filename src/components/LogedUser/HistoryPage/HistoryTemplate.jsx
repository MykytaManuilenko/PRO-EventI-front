import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import "./History.scss";
import Card from "../../UI/Card/Card";
import { convertData } from "../../../utils/convertDate";
import Spinner from "react-bootstrap/Spinner";
import Loading from "../../UI/Loading/Loading";

const HistoryTemplate = (props) => {
  const [archivedEvent, setArchivedEvent] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // window.scrollTo(0, props.scrollPosition);
    axiosInstance
      .get("api/events/my", { params: { status: "FINISHED" } })
      .then((res) => {
        console.log("resHistory :>> ", res);
        setArchivedEvent(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log("err :>> ", err));
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="containerForHistoryPage">
      <div className="header">
        <p className="headerText">History of my events</p>
      </div>
      <div className="archivedEventGridContainer">
        {archivedEvent && archivedEvent.length > 0 ? (
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

export default HistoryTemplate;
