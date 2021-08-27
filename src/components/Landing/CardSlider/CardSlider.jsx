import React, { useState } from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  Dot
} from "pure-react-carousel";
import "./CardSlider.scss";
import "pure-react-carousel/dist/react-carousel.es.css";

import Card from "../../UI/Card/Card";

const CardSlider = () => {
  return (
    <div className="carousel__container">
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={125}
        totalSlides={8}
        visibleSlides={1}
        currentSlide={2}
      >
        <Slider>
          {/* добавить карточки из базы */}
        <Slide index={1}>
            <Card
              image="./image1.png"
              name="Classic concert"
              date="16 May, 2021"
            />
          </Slide>
          <Slide index={2}>
            <Card
              image="./image2.png"
              name="Classic concert"
              date="16 May, 2021"
            />
          </Slide>

          <Slide index={3}>
            <Card
              image="./image3.png"
              name="Classic concert"
              date="16 May, 2021"
            />
          </Slide> 
          <Slide index={4}>
            <Card
              image="./image1.png"
              name="Classic concert"
              date="16 May, 2021"
            />
          </Slide> 
          <Slide index={5}>
            <Card
              image="./image2.png"
              name="Classic concert"
              date="16 May, 2021"
            />
          </Slide>
        </Slider>
        <Dot className="dots" slide={1}></Dot>
        <Dot className="dots" slide={2}></Dot>
        <Dot className="dots" slide={4}></Dot>
      </CarouselProvider>
    </div>
  );
};

export default CardSlider;
