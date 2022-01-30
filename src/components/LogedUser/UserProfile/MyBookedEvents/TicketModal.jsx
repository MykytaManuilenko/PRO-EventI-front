import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { convertData } from "../../../../utils/convertDate";
import { LocationIconLoged } from "../../../../assets/icons";
import axiosInstance from "../../../../utils/axiosInstance";
import { useEffect } from "react";
import Loading from "../../../UI/Loading/Loading";
import "./TicketModal.scss";
import QRCode from "react-google-qrcode";

const TicketModal = (props) => {
  const [eventData, setEventData] = useState();
  const [userData, setUserData] = useState();
  useEffect(() => {
    axiosInstance
      .get(`/api/events/${props.eventId}`)
      .then((res) => {
        setEventData(res.data);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });

    axiosInstance
      .get("/api/users/me")
      .then((res) => {
        setUserData(res.data);
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

  if (!eventData) {
    return <Loading />;
  }
  return (
    <Modal onHide={props.onHide} show={props.show}>
      <Modal.Header closeButton />
      <Modal.Body>
        <div className="eventTicket">
          <div
            className="eventHeader"
            style={{
              background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), center / cover no-repeat url(${eventData.backgroundUrl}) `,
            }}
          >
            <div className="eventDetails">
              <p className="eventTitle">{eventData.title}</p>
              <p className="secondary">
                <p>{convertDataWithTime(eventData.startTime)}</p>
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "20px",
                }}
              >
                <LocationIconLoged
                  style={{ width: "24px", height: "24px", zIndex: 2 }}
                />
                <p style={{ marginBottom: "0", marginLeft: "5px" }}>
                  {eventData.address.country}, {eventData.address.city},{" "}
                  {eventData.address.street}
                </p>
              </div>
            </div>
          </div>
          <div className="bottomPartOfTicket">
            <div className="ticketData">
              <p className="userName">
                Ticket for{" "}
                <b>
                  {userData && userData.firstName}{" "}
                  {userData && userData.lastName}
                </b>
              </p>
              <p className="totalPrice">
                Total Price: <b>{eventData.price}</b>
              </p>
            </div>
            <QRCode
              data="https://www.google.com"
              size={200}
              framed
              style={{ margin: "auto" }}
            />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default TicketModal;
