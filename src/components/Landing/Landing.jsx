import React from "react";
import Slider from "./Carousel/Slider";
import NavBar from "../Navigation/NavBar/NavBar"
import CardsPart from "./CardsPart/CardsPart";
import Footer from "../Navigation/Footer/Footer"

const Landing = (props) => {
  return (
    <div>
      <NavBar></NavBar>
      <Slider />
      <CardsPart/>
      <Footer/>
    </div>
  );
};

export default Landing;
