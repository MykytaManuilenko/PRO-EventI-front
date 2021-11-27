import React, { useEffect, useState } from "react";
import "./UserProfile.scss";
import axiosInstance from "../../../utils/axiosInstance";
import Button from "../../UI/Button/Button";
import EventCard from "../../UI/EventCard/EventCard";
import { convertData } from "../../../utils/convertData";
import { useHistory } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import ModalUi from "../../UI/ModalUi/ModalUi";

const UserProfile = () => {
  const [eventId, setEventId] = useState();
  const [userInfo, setUserInfo] = useState("");
  const [userEvent, setUserEvent] = useState();
  const [show, setShow] = useState(false);
  const history = useHistory();
  useEffect(() => {
    axiosInstance
      .get("/api/users/me")
      .then((res) => {
        setUserInfo(res.data);
        console.log("res.data :>> ", res.data);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
    axiosInstance
      .get("/api/events/my")
      .then((res) => {
        setUserEvent(res.data);
        console.log("MyEvents res :>> ", res);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  }, []);

  const customDropdown = React.forwardRef(({ onClick }, ref) => (
    <div
      ref={ref}
      className="moreButton"
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <img src="/more.svg" alt="" />
    </div>
  ));

  const clickHandler = (eventId) => {
    console.log("eventId :>> ", eventId);
    axiosInstance
      .patch(`/api/events/cancel/${eventId}`)
      .then((res) => {
        console.log("res :>> ", res);
        setShow(false);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  };

  return (
    <div className="profileCont">
      <div className="userInfoContainer">
        <div className="registerDate">Registered from 10.11.2021</div>
        <div className="userData">
          <p>
            {userInfo.firstName} {userInfo.lastName}
          </p>
        </div>
        <div className="buttonContainer">
          <Button class="editButt">Edit</Button>
        </div>
      </div>
      <div className="myEventsContainer">
        <p className="header">My Events</p>
        <div className="cards">
          <table>
            <tbody>
              {userEvent &&
                userEvent.map((event, key) => {
                  return (
                    <tr key={event.eventId}>
                      <td>
                        <EventCard
                          image={event.backgroundUrl}
                          title={event.title}
                          date={convertData(event.startTime)}
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
                          <Dropdown align="end">
                            <Dropdown.Toggle
                              as={customDropdown}
                              id="dropdown-basic"
                            ></Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item>Edit</Dropdown.Item>
                              <Dropdown.Item
                                onClick={() => {
                                  setShow(true);
                                  setEventId(event.eventId);
                                }}
                              >
                                Cancel
                              </Dropdown.Item>
                              <Dropdown.Item>Delete</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </td>
                    </tr>
                  );
                })}
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
    </div>
  );
};

export default UserProfile;
