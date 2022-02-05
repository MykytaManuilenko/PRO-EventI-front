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
import Button from "../../UI/Button/Button";
import AlertBootstrap from "../../UI/Alert/AlertBootstrap";
import EventTicket from "./EventTicket";
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const BookEventPage = () => {
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(true);

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
          {eventDetails && eventDetails.price !== "0.00" && (
            <Elements stripe={stripePromise}>
              <PaymentForm
                eventId={eventId}
                eventDetails={eventDetails && eventDetails}
              />
            </Elements>
          )}

          <EventTicket
            eventDetails={eventDetails}
            userData={userData}
            eventId={eventId}
          />
        </div>
      </div>
    </>
  );
};

export default BookEventPage;
