import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../utils/axiosInstance";
import { useHistory } from "react-router-dom";
import "./MyEvents.scss";
import { convertData } from "../../../../utils/convertDate";
import EventCard from "../../../UI/EventCard/EventCard";
import Button from "../../../UI/Button/Button";
import ModalUi from "../../../UI/ModalUi/ModalUi";
import {
  PublishIcon,
  CreateIcon,
  DeleteIcon,
  ReadMoreIcon,
} from "../../../../assets/icons";
import { uiActions } from "../../../../redux/slices/ui";
import { useDispatch } from "react-redux";
import Loading from "../../../UI/Loading/Loading";

const MyEventsTemplate = (props) => {
  const [events, setEvents] = useState();
  const history = useHistory();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isPublished, setIsPublished] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [eventId, setEventId] = useState(false);

  useEffect(() => {
    window.scrollTo(0, props.scrollPosition);
    axiosInstance
      .get("/api/events/my", {
        params: {
          status: "PUBLISHED, DRAFT",
          limit: props.cardQuantityShown && props.cardQuantityShown,
        },
      })
      .then((res) => {
        console.log("res :>> ", res);
        setEvents(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  }, [isPublished, isDeleted]);

  const handleDeleteEvent = (eventId) => {
    axiosInstance
      .delete(`/api/events/${eventId}`)
      .then((res) => {
        console.log("res :>> ", res);
        setIsDeleted(!isDeleted);
        dispatch(
          uiActions.openAlert({
            status: "success",
            message: "Event is deleted successfully!",
          })
        );
        setError("");
        setShow(false);
      })
      .catch((err) => {
        console.log("err :>> ", err);
        setError(err.response.data.message);
      });
  };

  const publishEventHandler = (eventId) => {
    axiosInstance
      .patch(`/api/events/${eventId}`)
      .then((res) => {
        console.log("res :>> ", res);
        dispatch(
          uiActions.openAlert({
            status: "success",
            message: "Event is published successfully!",
          })
        );
        setIsPublished(!isPublished);
      })
      .catch((err) => {
        dispatch(
          uiActions.openAlert({
            status: "error",
            message: err.response.data.message,
          })
        );
        console.log("err :>> ", err);
      });
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <div className="containerCreatedEvents">
        <div className="header">
          <p className="headerText">My Events</p>

          {!props.hideButton && (
            <Button class="showButt" onClick={() => history.push("/myEvents")}>
              Show all
            </Button>
          )}
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
                          status={event.status}
                        />
                      </td>
                      <td style={{ width: "20%", marginLeft: "10px" }}>
                        <div className="eventButtons">
                          {event.status === "DRAFT" && (
                            <Button
                              class="actionButton"
                              onClick={() => publishEventHandler(event.eventId)}
                            >
                              <PublishIcon />
                            </Button>
                          )}

                          <Button
                            class="actionButton"
                            onClick={() => {
                              event.status === "DRAFT"
                                ? history.push(
                                    `/myEvents/${event.eventId}/edit`
                                  )
                                : event.status === "PUBLISHED" &&
                                  history.push(
                                    `myEvents/${event.eventId}/postpone`
                                  );
                            }}
                          >
                            <CreateIcon />
                          </Button>
                          <Button
                            class="actionButton"
                            onClick={() => {
                              setShow(true);
                              setEventId(event.eventId);
                            }}
                          >
                            <DeleteIcon />
                          </Button>
                          <Button
                            class="actionButton"
                            onClick={() =>
                              history.push(`/events/${event.eventId}`)
                            }
                          >
                            <ReadMoreIcon />
                          </Button>
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
              hide={() => {
                setShow(false);
                setError("");
              }}
              title="Are you sure you want to delete the event?"
              firstButton="No"
              secondButton="Yes"
              firstBttClick={() => setShow(false)}
              secondBttClick={() => handleDeleteEvent(eventId)}
              error={error}
              setError={setError}
            />
          </table>
        </div>
      </div>
    </>
  );
};

export default MyEventsTemplate;
