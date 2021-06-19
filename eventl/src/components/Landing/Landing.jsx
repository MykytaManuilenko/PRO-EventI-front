import React from "react";
import Slider from "./Carousel/Slider";
import NavBar from "../Navigation/NavBar/NavBar"

const Landing = (props) => {
  return (
    <div>
      <NavBar></NavBar>
      <Slider />
    </div>
  );
};

export default Landing;
