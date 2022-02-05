import React from "react";
import { LocationIconLoged } from "../../../assets/icons";
import axiosInstance from "../../../utils/axiosInstance";
import { convertData } from "../../../utils/convertDate";
import Button from "../../UI/Button/Button";
import { uiActions } from "../../../redux/slices/ui";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

const convertDataWithTime = (date) => {
  const data = new Date(date);
  return (
    convertData(date) + " at " + data.getUTCHours() + ":" + data.getUTCMinutes()
  );
};
const registerForEvent = (eventId, dispatch, history) => {
  const data = {};
  axiosInstance
    .post(`/api/events/book/${eventId}`)
    .then((res) => {
      console.log("res :>> ", res);
      dispatch(
        uiActions.openAlert({
          status: "success",
          message:
            "Your ticket is in your profile :) We are waiting to see you on event!",
        })
      );
      history.push(`/events/${eventId}`);
    })
    .catch((err) => {
      console.log("err :>> ", err);
      dispatch(
        uiActions.openAlert({
          status: "error",
          message: err.response.data.message,
        })
      );
    });
};
const EventTicket = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  return (
    <div
      className={
        props.eventDetails && props.eventDetails.price === "0.00"
          ? "eventTicketRegister"
          : "eventTicket"
      }
    >
      <div
        className="eventHeader"
        style={
          props.eventDetails && {
            background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), center / cover no-repeat url(${props.eventDetails.backgroundUrl}) `,
          }
        }
      >
        <div className="eventDetails">
          <p className="eventTitle">
            {props.eventDetails && props.eventDetails.title}
          </p>
          <p className="secondary">
            <p>
              {convertDataWithTime(
                props.eventDetails && props.eventDetails.startTime
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
              {props.eventDetails && props.eventDetails.address.country},{" "}
              {props.eventDetails && props.eventDetails.address.city},{" "}
              {props.eventDetails && props.eventDetails.address.street}
            </p>
          </div>
        </div>
      </div>
      <div className="bottomPartOfTicket">
        <p className="userName">
          Ticket for{" "}
          <b>
            {props.userData && props.userData.firstName}{" "}
            {props.userData && props.userData.lastName}
          </b>
        </p>
        <p className="totalPrice">
          Total Price: <b>{props.eventDetails && props.eventDetails.price}</b>
        </p>
      </div>
      {props.eventDetails && props.eventDetails.price === "0.00" && (
        <Button
          type="submit"
          class="registerEventButton"
          onClick={() => registerForEvent(props.eventId, dispatch, history)}
        >
          Register for event
        </Button>
      )}
    </div>
  );
};

export default EventTicket;
