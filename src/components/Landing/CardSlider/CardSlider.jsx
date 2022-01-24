import React from "react";
import { CarouselProvider, Slider, Slide, Dot } from "pure-react-carousel";
import "./CardSlider.scss";
import "pure-react-carousel/dist/react-carousel.es.css";

import Card from "../../UI/Card/Card";
import { convertData } from "../../../utils/convertDate";

const CardSlider = (props) => {
  return (
    <div className="carousel__container">
      <CarouselProvider
        naturalSlideWidth={50}
        naturalSlideHeight={225}
        totalSlides={8}
        visibleSlides={1}
        currentSlide={2}
      >
        <Slider>
          {props.events &&
            props.events.map((event, key) => {
              return (
                <Slide index={key}>
                  <Card
                    className="nonAuthenticated"
                    image={event.backgroundUrl}
                    name={event.title}
                    date={convertData(event.startTime)}
                  />
                </Slide>
              );
            })}
        </Slider>
        <Dot className="dots" slide={1}></Dot>
        <Dot className="dots" slide={2}></Dot>
        <Dot className="dots" slide={4}></Dot>
      </CarouselProvider>
    </div>
  );
};

export default CardSlider;
