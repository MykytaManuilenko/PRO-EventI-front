import React, { useEffect } from "react";
// import "./CardSlider.scss";
import Card from "../../UI/Card/Card";
// import Glide from "@glidejs/glide";

const sliderConfiguration = {
  gap: 20,
  perView: 2,
  startAt: 0,
  type: "slider",
};
const CardSlider = () => {
//   const slider = new Glide(".glide", sliderConfiguration);

//   useEffect(() => {
//     return () => slider.mount()
//   }, [slider])

  return (
    <div className="main__glide">
      <div className="glide__track" data-glide-el="track">
        <ul className="glide__slides">
          <li className="glide__slide">
            <Card
              image="./image1.png"
              name="Classic concert"
              date="16 May, 2021"
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CardSlider;
