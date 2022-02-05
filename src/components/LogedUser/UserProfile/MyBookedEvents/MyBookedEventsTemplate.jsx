import React, { useState } from "react";
import { useEffect } from "react";
import axiosInstance from "../../../../utils/axiosInstance";
import Card from "../../../UI/Card/Card";
import Loading from "../../../UI/Loading/Loading";
import { convertData } from "../../../../utils/convertDate";
import Button from "../../../UI/Button/Button";
import { useHistory } from "react-router-dom";

const MyBookedEventsTemplate = (props) => {
  const [bookedEvents, setBookedEvents] = useState([]);
  const history = useHistory();
  useEffect(() => {
    axiosInstance
      .get(
        "/api/events/my/book",
        props.cardQuantityShown && {
          params: { limit: props.cardQuantityShown },
        }
      )
      .then((res) => {
        console.log("resBOOKEDEVENT :>> ", res);
        setBookedEvents(res.data);
      })
      .catch((err) => {
        console.log("errBooker :>> ", err);
      });
  }, []);
  if (bookedEvents.length === 0) {
    return <Loading />;
  }
  return (
    <>
      <div className="containerForLikedPage">
        <div className="header">
          <p className="headerText">My Tickets</p>
          {!props.hideButton && (
            <Button
              class="showButt"
              onClick={() => history.push("/bookedEvents")}
            >
              Show all
            </Button>
          )}
        </div>
        <div className="containerForLikedEvent">
          {bookedEvents && bookedEvents.length > 0 ? (
            bookedEvents.map((bookedEvent) => {
              return (
                <>
                  <Card
                    image={bookedEvent.backgroundUrl}
                    name={bookedEvent.title}
                    eventId={bookedEvent.eventId}
                    isLiked={bookedEvent.isLiked}
                    key={bookedEvent.eventId}
                    date={convertData(bookedEvent.startTime)}
                    isCanceled={bookedEvent.canceled}
                    tickets
                  />
                </>
              );
            })
          ) : (
            <p>You have no booked events :(</p>
          )}
        </div>
      </div>
    </>
  );
};

export default MyBookedEventsTemplate;
