import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../utils/axiosInstance";
import { useHistory } from "react-router-dom";
import "./MyEvents.scss";
import { convertData } from "../../../../utils/convertData";
import EventCard from "../../../UI/EventCard/EventCard";
import Button from "../../../UI/Button/Button";
import ModalUi from "../../../UI/ModalUi/ModalUi";
import ButtonBasedDropdown from "../../../UI/ButtonBasedDropdown/ButtonBasedDropdown";

const MyEventsTemplate = (props) => {
  const [events, setEvents] = useState();
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [eventId, setEventId] = useState();
  const [isCanceled, setIsCanceled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, props.scrollPosition);
    axiosInstance
      .get(
        "/api/events/my",
        props.cardQuantityShown && {
          params: { limit: props.cardQuantityShown },
        }
      )
      .then((res) => {
        console.log("res :>> ", res);
        setEvents(res.data);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  }, [isCanceled]);

  const clickHandler = (eventId) => {
    console.log("eventId :>> ", eventId);
    axiosInstance
      .patch(`/api/events/cancel/${eventId}`)
      .then((res) => {
        setShow(false);
        setIsCanceled(!isCanceled);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  };

  return (
    <>
      <div className="containerCreatedEvents">
        <div className="header">
          <p className="headerText">My Events</p>

          <Button class="showButt" onClick={() => history.push("/myEvents")}>
            Show all
          </Button>
        </div>
        <div className="cardsContainer">
          <table>
            <tbody>
              {events && events.length > 0 ? (
                events.map((event) => {
                  return (
                    <tr key={event.eventId}>
                      <td>
                        <EventCard
                          image={event.backgroundUrl}
                          title={event.title}
                          date={convertData(event.startTime)}
                          isCanceled={event.canceled}
                        />
                      </td>
                      <td>
                        <div className="eventButtons">
                          <Button
                            class="showButton"
                            onClick={() =>
                              history.push(`/events/${event.eventId}`)
                            }
                          >
                            Show more
                          </Button>
                          <ButtonBasedDropdown
                            onClick={() => {
                              setShow(true);
                              setEventId(event.eventId);
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td>
                    <div>You have not created any events yet :(</div>
                  </td>
                </tr>
              )}
            </tbody>
            <ModalUi
              show={show}
              hide={() => setShow(false)}
              title="Are you sure you want to cancel the event?"
              firstButton="No"
              secondButton="Yes"
              firstBttClick={() => setShow(false)}
              secondBttClick={() => clickHandler(eventId)}
            ></ModalUi>
          </table>
        </div>
      </div>
    </>
  );
};

export default MyEventsTemplate;
