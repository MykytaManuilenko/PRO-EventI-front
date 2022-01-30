import React from "react";
import { CarouselProvider, Slider, Slide, Dot } from "pure-react-carousel";
import "./CardSlider.scss";
import "pure-react-carousel/dist/react-carousel.es.css";

import Card from "../../UI/Card/Card";
import { convertData } from "../../../utils/convertDate";

const CardSlider = (props) => {
  return (
    <div
      className={props.isAuth ? "carouselContainerAuth" : "carousel__container"}
    >
      <CarouselProvider
        naturalSlideWidth={props.isAuth ? 100 : 100}
        naturalSlideHeight={225}
        totalSlides={10}
        visibleSlides={1}
        currentSlide={1}
      >
        <Slider className={props.isAuth ? "authPerson" : "notAuth"}>
          {props.events &&
            props.events.map((event, key) => {
              return (
                <Slide index={key}>
                  {props.isAuth ? (
                    <Card
                      key={event.eventId}
                      image={event.backgroundUrl}
                      name={event.title}
                      date={convertData(event.startTime)}
                      eventId={event.eventId}
                      isLiked={event.isLiked}
                      price={event.price}
                    />
                  ) : (
                    <Card
                      className="nonAuthenticated"
                      image={event.backgroundUrl}
                      name={event.title}
                      date={convertData(event.startTime)}
                    />
                  )}
                </Slide>
              );
            })}
        </Slider>
        <Dot className="dots" slide={1}></Dot>
        <Dot className="dots" slide={3}></Dot>
        <Dot className="dots" slide={5}></Dot>
      </CarouselProvider>
    </div>
  );
};

export default CardSlider;
