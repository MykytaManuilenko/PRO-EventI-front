import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../utils/axiosInstance";
import Button from "../../../UI/Button/Button";
import { useHistory } from "react-router-dom";
import "./History.scss";
import Card from "../../../UI/Card/Card";
import { convertData } from "../../../../utils/convertData";

const HistoryTemplate = (props) => {
  const history = useHistory();
  const [archivedEvent, setArchivedEvent] = useState();
  useEffect(() => {
    window.scrollTo(0, props.scrollPosition);
    axiosInstance
      .get(
        "/api/events/my/history",
        props.cardQuantityShown && {
          params: { limit: props.cardQuantityShown },
        }
      )
      .then((res) => {
        setArchivedEvent(res.data);
        console.log("res :>> ", res);
      })
      .catch((err) => console.log("err :>> ", err));
  }, []);
  return (
    <div className="containerForHistoryPage">
      <div className="header">
        <p className="headerText">History</p>
        <Button class="showButt" onClick={() => history.push("/history")}>
          Show all
        </Button>
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
