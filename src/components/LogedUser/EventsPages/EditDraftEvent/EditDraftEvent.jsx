import React, { useEffect, useState } from "react";
import "../CreateEvent/CreateEvent.scss";
import { useHistory, useParams } from "react-router-dom";
import axiosInstance from "../../../../utils/axiosInstance";
import Form from "../../Form/Form";
import Spinner from "react-bootstrap/esm/Spinner";

const EditDraftEvent = () => {
  const [eventData, setEventData] = useState();
  const { eventId } = useParams();

  const history = useHistory();
  useEffect(() => {
    axiosInstance
      .get(`/api/events/${eventId}`)
      .then((res) => {
        console.log("res :>> ", res.data);
        setEventData(res.data);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  }, []);
  if (!eventData) {
    return <Spinner animation="border" variant="warning" />;
  }
  if (eventData.status !== "DRAFT") {
    history.push("/events");
  }
  return <Form isEdit={true} data={eventData && eventData} eventId={eventId} />;
};

export default EditDraftEvent;
