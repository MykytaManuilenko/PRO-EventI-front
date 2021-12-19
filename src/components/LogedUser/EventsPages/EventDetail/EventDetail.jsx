import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../utils/axiosInstance";
import { useParams } from "react-router-dom";
import "./EventDetail.scss";
import Button from "../../../UI/Button/Button";
import { convertData } from "../../../../utils/convertData";
import Like from "../../../UI/LikeSVG/Like";
import TypeCard from "../../../UI/TypeCard/TypeCard";
import GoBack from "../../../UI/GoBack/GoBack";

const EventDetail = () => {
  const { eventId } = useParams();
  console.log("eventId :>> ", eventId);
  const [event, setEvent] = useState();
  const [isLiked, setIsLiked] = useState();

  useEffect(() => {
    axiosInstance
      .get(`/api/events/${eventId}`)
      .then((res) => {
        setEvent(res.data);
        setIsLiked(res.data.isLiked);
        console.log("res.data :>> ", res.data);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  }, []);

  const convertDataWithTime = (date) => {
    const data = new Date(date);
    return (
      convertData(date) +
      " at " +
      data.getUTCHours() +
      ":" +
      data.getUTCMinutes()
    );
  };

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
      <GoBack />
      <div className="containerForEvent">
        {event && (
          <>
            <div
              className="eventHeader"
              style={{
                background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), center / cover no-repeat url(${event.backgroundUrl}) `,
              }}
            >
              <div className="likeContainer">
                <Like
                  addFavourite={() => addFavourite(eventId)}
                  isLiked={isLiked}
                />
              </div>
              <div className="eventTitle">
                <div className="leftPartTitle">
                  <p className="title">{event.title}</p>
                  <p className="secondary">
                    by {event.owner.firstName} {event.owner.lastName}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: "20px",
                    }}
                  >
                    <img
                      src="/locationI.svg"
                      alt=""
                      style={{ width: "24px", height: "24px", zIndex: 2 }}
                    />
                    <p style={{ marginBottom: "0", marginLeft: "5px" }}>
                      {event.address.country}, {event.address.city},{" "}
                      {event.address.street}
                    </p>
                  </div>
                </div>
                <div className="rightPart">
                  <p
                    style={{
                      fontSize: "20px",
                      fontWeight: "600",
                      marginBottom: "10px",
                    }}
                  >
                    Date&time
                  </p>
                  <p>{convertDataWithTime(event.startTime)}</p>
                  <p
                    style={{
                      marginTop: "20px",
                      marginBottom: "0",
                      fontSize: "16px",
                      fontWeight: "700",
                    }}
                  >
                    Price: {event.price}
                  </p>
                  <Button class="buyButton">Book now</Button>
                </div>
              </div>
            </div>
            <div className="descriptionPart">
              <div className="leftDescription">
                <p className="descrTitle">Description</p>
                <p className="descriptionText">{event.description}</p>
                <p className="descrTitle">Event Photo</p>
                <div className="photoContainer">
                  {event.photos &&
                    event.photos.map((photo) => {
                      return (
                        <img src={photo.photoUrl} alt="" key={photo.fileId} />
                      );
                    })}
                </div>
              </div>
              <div className="rightDescription">
                <p className="descrTitle">Location</p>

                <p className="descrTitle">Type</p>
                {event.types &&
                  event.types.map((type, index) => {
                    return <TypeCard typeName={type} index={index} />;
                  })}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default EventDetail;
