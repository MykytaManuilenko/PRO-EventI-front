import React, { useState } from "react";
import Slider from "./Carousel/Slider";
import CardsPart from "./CardsPart/CardsPart";
import { useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import Loading from "../UI/Loading/Loading";

const Landing = () => {
  const [events, setEvents] = useState();
  const [eventCopy, setEventsCopy] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axiosInstance
      .get("/api/events")
      .then((res) => {
        setEvents(res.data);
        setEventsCopy(res.data);
        console.log("res :>> ", res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  }, []);
  console.log("events :>> ", events);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <Slider setEventsCopy={setEventsCopy} events={events && events} />
      <CardsPart events={eventCopy && eventCopy} />
    </div>
  );
};

export default Landing;
