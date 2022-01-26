import React, { useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm/PaymentForm";
import GoBack from "../../UI/GoBack/GoBack";
import { useParams } from "react-router-dom";
import "./BookEventPage.scss";
import axiosInstance from "../../../utils/axiosInstance";
import { useState } from "react";
import Loading from "../../UI/Loading/Loading";
import { LocationIconLoged } from "../../../assets/icons";
import { convertData } from "../../../utils/convertDate";
import AlertBootstrap from "../../UI/Alert/AlertBootstrap";
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const BookEventPage = () => {
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(true);

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
  useEffect(() => {
    axiosInstance
      .get(`/api/events/${eventId}`)
      .then((res) => {
        console.log("res :>> ", res);
        setEventDetails(res.data);
        // setIsLoading(false);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });

    axiosInstance
      .get(`/api/users/me`)
      .then((res) => {
        console.log("res :>> ", res);
        setUserData(res.data);
        // setIsLoading(false);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  }, []);
  if (!userData && eventDetails) {
    return <Loading />;
  }
  return (
    <>
      <AlertBootstrap />
      <div className="bookEventContainer">
        <GoBack />

        <div className="contentContainer">
          <Elements stripe={stripePromise}>
            <PaymentForm eventId={eventId} />
          </Elements>

          <div className="eventTicket">
            <div
              className="eventHeader"
              style={
                eventDetails && {
                  background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), center / cover no-repeat url(${eventDetails.backgroundUrl}) `,
                }
              }
            >
              <div className="eventDetails">
                <p className="eventTitle">
                  {eventDetails && eventDetails.title}
                </p>
                <p className="secondary">
                  <p>
                    {convertDataWithTime(
                      eventDetails && eventDetails.startTime
                    )}
                  </p>
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
                    {eventDetails && eventDetails.address.country},{" "}
                    {eventDetails && eventDetails.address.city},{" "}
                    {eventDetails && eventDetails.address.street}
                  </p>
                </div>
              </div>
            </div>
            <div className="bottomPartOfTicket">
              <p className="userName">
                Ticket for{" "}
                <b>
                  {userData && userData.firstName}{" "}
                  {userData && userData.lastName}
                </b>
              </p>
              <p className="totalPrice">
                Total Price: <b>{eventDetails && eventDetails.price}</b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookEventPage;
