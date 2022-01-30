import React, { useState } from "react";
import "./Card.scss";
import Button from "../Button/Button";
import { useSelector } from "react-redux";
import axiosInstance from "../../../utils/axiosInstance";
import Like from "../LikeSVG/Like";
import { useHistory } from "react-router-dom";
import TicketModal from "../../LogedUser/UserProfile/MyBookedEvents/TicketModal";

const Card = (props) => {
  const isAuthenticated = useSelector(
    (state) => state.authentication.isAuthenticated
  );
  const [modalShow, setModalShow] = useState(false);
  const history = useHistory();
  const [isLiked, setIsLiked] = useState(props.isLiked);
  const [likedArray, setLikedArray] = useState([]);

  const addFavourite = (eventId) => {
    const likeCopy = [...likedArray];
    if (isLiked || likeCopy.includes(eventId)) {
      const index = likeCopy.indexOf(eventId);
      likeCopy.splice(index, 1);
      setLikedArray(likeCopy);
      setIsLiked(false);
      axiosInstance
        .post(`/api/events/like/${eventId}`, { like: false })
        .then((res) => {
          console.log("res :>> ", res);
        })
        .catch((err) => {
          console.log("err :>> ", err);
        });
    } else {
      likeCopy.push(eventId);
      setLikedArray(likeCopy);
      setIsLiked(true);
      axiosInstance
        .post(`/api/events/like/${eventId}`, { like: true })
        .then((res) => {
          console.log("res :>> ", res);
        })
        .catch((err) => {
          console.log("err :>> ", err);
        });
    }
    console.log("likeCopy :>> ", likeCopy);
  };

  return (
    <>
      <div className="Card">
        <div
          className={["UpPart", props.className].join(" ")}
          style={{ background: `center / cover no-repeat url(${props.image})` }}
        ></div>
        <div className="DownPart">
          <div className="TextContainer">
            <p className="EventName">{props.name}</p>
            <p className="EventDate">{props.date}</p>
          </div>
        </div>

        <div className="hovered">
          {props.tickets ? (
            <div className="hoveredContainer">
              <Button
                class="showMoreButtNonAuth"
                onClick={() => setModalShow(true)}
              >
                View ticket
              </Button>
            </div>
          ) : (
            <div className="hoveredContainer">
              {isAuthenticated && (
                <Like
                  isLiked={isLiked}
                  addFavourite={() => addFavourite(props.eventId)}
                />
              )}
              <Button
                class={isAuthenticated ? "showMoreButt" : "showMoreButtNonAuth"}
                onClick={() => history.push(`/events/${props.eventId}`)}
              >
                Show more
              </Button>
            </div>
          )}
        </div>
      </div>
      {props.tickets && (
        <TicketModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          eventId={props.eventId}
        />
      )}
    </>
  );
};

export default Card;
