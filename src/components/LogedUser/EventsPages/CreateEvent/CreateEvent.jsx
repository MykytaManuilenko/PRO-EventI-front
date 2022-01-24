import React, { useEffect, useState } from "react";
import "./CreateEvent.scss";
import axiosInstance from "../../../../utils/axiosInstance";
import Form from "../../Form/Form";
import Loading from "../../../UI/Loading/Loading";

const CreateEvent = () => {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    getType();
  }, []);
  const getType = () => {
    axiosInstance
      .get("/api/event-types")
      .then((res) => {
        setTypes(res.data);
        console.log("res.data :>> ", res.data);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  };
  if (types.length === 0) {
    return <Loading />;
  }
  return <Form />;
};

export default CreateEvent;
