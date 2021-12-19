import React, { useEffect, useState } from "react";
import "./UserProfile.scss";
import axiosInstance from "../../../utils/axiosInstance";
import Button from "../../UI/Button/Button";
import EventCard from "../../UI/EventCard/EventCard";
import { convertData } from "../../../utils/convertData";
import { useHistory } from "react-router-dom";
import ModalUi from "../../UI/ModalUi/ModalUi";
import TypeCard from "../../UI/TypeCard/TypeCard";
import Card from "../../UI/Card/Card";
import ButtonBasedDropdown from "../../UI/ButtonBasedDropdown/ButtonBasedDropdown";

const UserProfile = () => {
  const [eventId, setEventId] = useState();
  const [userInfo, setUserInfo] = useState("");
  const [userEvent, setUserEvent] = useState([]);
  const [likedEvents, setLikedEvents] = useState("");
  const [show, setShow] = useState(false);
  const [isCanceled, setIsCanceled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    axiosInstance
      .get("/api/users/me")
      .then((res) => {
        setUserInfo(res.data);
        setIsLoading(false);
        console.log("res.data :>> ", res.data);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
    axiosInstance
      .get("/api/events/my", { params: { limit: 3 } })
      .then((res) => {
        setUserEvent(res.data);
        setIsLoading(false);
        console.log("MyEvents res :>> ", res);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  }, [isCanceled]);

  //ЭТО НУЖНО ПОМЕНЯТЬ!!!!!!!!!!
  useEffect(() => {
    axiosInstance
      .get("/api/events/my/like", { params: { limit: 5 } })
      .then((res) => {
        console.log("resMYLIKED :>> ", res);
        setLikedEvents(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  }, []);

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

  return isLoading ? (
    <p> Loading...</p>
  ) : (
    <div className="profileCont">
      <div className="userInfoContainer">
        <div className="registerDate">Registered from 10.11.2021</div>
        <div className="userData">
          <p>
            {userInfo.firstName} {userInfo.lastName}
          </p>
        </div>
        <div className="bottomPart">
          <div className="userTypeContainer">
            {userInfo.eventTypes &&
              userInfo.eventTypes.map((eventType) => {
                return <TypeCard typeName={eventType} />;
              })}
          </div>
          <Button class="editButt">Edit</Button>
        </div>
      </div>
      <div className="myEventsContainer">
        <div className="header">
          <p className="headerText">My Events</p>
          <Button class="showButt" onClick={() => history.push("/myEvents")}>
            Show all
          </Button>
        </div>

        <div className="cards">
          <table>
            <tbody>
              {userEvent && userEvent.length > 0 ? (
                userEvent.map((event) => {
                  return (
                    <tr key={event.eventId}>
                      <td>
                        <EventCard
                          image={event.backgroundUrl}
                          title={event.title}
                          date={convertData(event.startTime)}
                          isCanceled={event.canceled}
                        ></EventCard>
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
                <p>You have not created any events yet :(</p>
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
      <div className="likedEventContainer">
        <div className="header">
          <p className="headerText">Liked Events</p>
          <Button class="showButt" onClick={() => history.push("/likedEvents")}>
            Show all
          </Button>
        </div>
        <div className="likedEventCards">
          {likedEvents &&
            likedEvents.map((likedEvent) => {
              return (
                <Card
                  image={likedEvent.backgroundUrl}
                  name={likedEvent.title}
                  date={convertData(likedEvent.startTime)}
                  eventId={likedEvent.eventId}
                  isLiked={likedEvent.isLiked}
                  key={likedEvent.eventId}
                  isCanceled={likedEvent.canceled}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
