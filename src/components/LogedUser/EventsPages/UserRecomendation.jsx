import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import CardSlider from "../../Landing/CardSlider/CardSlider";
import Loading from "../../UI/Loading/Loading";

const UserRecomendation = (props) => {
  const [userTypes, setUserTypes] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axiosInstance
      .get("/api/users/me")
      .then((res) => {
        console.log("res :>> ", res);
        setUserTypes(res.data.eventTypes);
        getEventsBasedOnUserType(props.events, res.data.eventTypes);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  }, []);
  const getEventsBasedOnUserType = (events, userEventTypes) => {
    console.log("events :>> ", events);
    console.log("recommendation :>> ");
    return events.filter((event) =>
      event.types.some((type) =>
        userEventTypes.some((userType) => userType === type)
      )
    );
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <CardSlider
      events={getEventsBasedOnUserType(props.events, userTypes)}
      isAuth
    />
  );
};

export default UserRecomendation;
