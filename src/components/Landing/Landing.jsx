import React from "react";
import Slider from "./Carousel/Slider";
import NavBar from "../Navigation/NavBar/NavBar"
import CardsPart from "./CardsPart/CardsPart";
import Footer from "../Navigation/Footer/Footer"

const Landing = (props) => {
  // const cardsArray = [
  //   { image: "./image1.png", name: "Classic concert", date: "16 May, 2021", type:"Music" },
  //   { image: "./image2.png", name: "Dance competition", date: "16 May, 2021", type:"Dance" },
  //   { image: "./image3.png", name: "Classic concert", date: "16 May, 2021", type:"Dance" },
  //   { image: "./image2.png", name: "Classic concert", date: "16 May, 2021" },
  //   { image: "./image1.png", name: "Classic concert", date: "16 May, 2021" },
  //   { image: "./image3.png", name: "Classic concert", date: "16 May, 2021" },
  //   { image: "./image2.png", name: "Classic concert", date: "16 May, 2021" },
  //   { image: "./image3.png", name: "Classic concert", date: "16 May, 2021" },
  //   { image: "./image1.png", name: "Classic concert", date: "16 May, 2021" },
  //   { image: "./image2.png", name: "Classic concert", date: "16 May, 2021" }
  // ];

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
