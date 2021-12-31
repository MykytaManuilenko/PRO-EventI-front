import React, { useState } from "react";
import Slider from "./Carousel/Slider";
import CardsPart from "./CardsPart/CardsPart";
import { useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";

const Landing = () => {
  const [events, setEvents] = useState();
  useEffect(() => {
    axiosInstance
      .get("/api/events")
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  }, []);
  return (
    <div>
      <Slider />
      <CardsPart events={events} />
    </div>
  );
};

export default Landing;
