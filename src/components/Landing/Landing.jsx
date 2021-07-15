import React from "react";
import Slider from "./Carousel/Slider";
import NavBar from "../Navigation/NavBar/NavBar"
import CardsPart from "./CardsPart/CardsPart";

const Landing = (props) => {
  return (
    <div>
      <NavBar></NavBar>
      <Slider />
      <CardsPart/>
    </div>
  );
};

export default Landing;
