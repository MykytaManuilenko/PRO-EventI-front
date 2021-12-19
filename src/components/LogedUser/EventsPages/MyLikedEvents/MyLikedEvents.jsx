import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../utils/axiosInstance";
import Card from "../../../UI/Card/Card";
import { convertData } from "../../../../utils/convertData";
import "./MyLikedEvents.scss";
import GoBack from "../../../UI/GoBack/GoBack";

const MyLikedEvents = () => {
  const [likedEvents, setLikedEvents] = useState([]);
  useEffect(() => {
    axiosInstance
      .get("/api/events/my/like")
      .then((res) => {
        console.log("res :>> ", res);
        setLikedEvents(res.data);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  }, []);
  return (
    <>
      <GoBack />
      <div className="containerForLikedPage">
        <div className="containerForLikedEvent">
          {likedEvents &&
            likedEvents.map((likedEvent) => {
              return (
                <Card
                  image={likedEvent.backgroundUrl}
                  name={likedEvent.title}
                  eventId={likedEvent.eventId}
                  isLiked={likedEvent.isLiked}
                  key={likedEvent.eventId}
                  date={convertData(likedEvent.startTime)}
                  isCanceled={likedEvent.canceled}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};

export default MyLikedEvents;
