import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../utils/axiosInstance";
import { useParams, useHistory } from "react-router-dom";
import "./EventDetail.scss";
import Button from "../../../UI/Button/Button";
import { convertData } from "../../../../utils/convertData";

const EventDetail = () => {
  const { eventId } = useParams();
  console.log("eventId :>> ", eventId);
  const [event, setEvent] = useState();
  const history = useHistory();

  useEffect(() => {
    axiosInstance
      .get(`/api/events/${eventId}`)
      .then((res) => {
        console.log("Eventres :>> ", res.data);
        setEvent(res.data);
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

  return (
    <>
      <div className="containerGoBack">
        <p className="goBack" onClick={() => history.goBack()}>
          Go Back
        </p>
      </div>
      <div className="containerForEvent">
        {event && (
          <>
            <div className="eventHeader">
              <img src={event.backgroundUrl} alt="" />
              <div className="eventTitle">
                {/* <img src="/like.svg" alt="" /> */}
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
                </div>
              </div>
              <div className="buttonContainer">
                <Button class="buyButton">Book now</Button>
              </div>
            </div>
            <div className="descriptionPart">
              <div className="leftDescription">
                <p className="descrTitle">Description</p>
                <p className="descriptionText">{event.description}</p>
                <p className="descrTitle">Event Photo</p>
              </div>
              <div className="rightDescription">
                <p className="descrTitle">Location</p>
                <p className="descrTitle">Type</p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default EventDetail;
