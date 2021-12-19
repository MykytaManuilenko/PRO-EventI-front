import React, { useState } from "react";
import "./Card.scss";
import Button from "../Button/Button";
import { useSelector } from "react-redux";
import axiosInstance from "../../../utils/axiosInstance";
import Like from "../LikeSVG/Like";
import { useHistory } from "react-router-dom";

const Card = (props) => {
  const isAuthenticated = useSelector(
    (state) => state.authentication.isAuthenticated
  );
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
    <div className="Card">
      <div
        className="UpPart"
        style={
          !props.isCanceled
            ? { background: `center / cover no-repeat url(${props.image})` }
            : {
                background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), center / cover no-repeat url(${props.image})`,
              }
        }
      >
        {props.isCanceled ? <p>Canceled</p> : null}
      </div>
      <div className="DownPart">
        <div className="TextContainer">
          <p className="EventName">{props.name}</p>
          <p className="EventDate">{props.date}</p>
        </div>
      </div>
      <div className="hovered">
        <div className="hoveredContainer">
          {isAuthenticated && (
            <Like
              isLiked={isLiked}
              addFavourite={() => addFavourite(props.eventId)}
            />
          )}
          <p>{props.price}</p>
          <Button
            class="showMoreButt"
            onClick={() => history.push(`/events/${props.eventId}`)}
          >
            Show more
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
