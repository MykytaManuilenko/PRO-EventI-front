import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "./Carousel.scss";
import Button from '../../UI/Button/Button'

const Slider = () => {
  return (
    <Carousel indicators={false} interval={null}>
      <Carousel.Item>
        <img src="/v2.png" alt="First slide" />
        <Carousel.Caption className="name">
          <p className="boldHeader">T-Fest concert in Warsaw</p>
          <p className="smallText">By Marvin McKinney</p>
          <p className="locText">Date&Time</p>
          <p className="smallText">
          June 20, 2021 at 19:30
          </p>
          <Button>More</Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src="/image2.png" alt="Second slide" />
        <Carousel.Caption className="name">
          <p className="boldHeader">T-Fest concert in Warsaw</p>
          <p className="smallText">By Marvin McKinney</p>
          <p className="locText">Date&Time</p>
          <p className="smallText">
          June 20, 2021 at 19:30
          </p>
          <Button>More</Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src="/image3.png" alt="Third slide" />
        <Carousel.Caption className="name">
          <p className="boldHeader">T-Fest concert in Warsaw</p>
          <p className="smallText">By Marvin McKinney</p>
          <p className="locText">Date&Time</p>
          <p className="smallText">
          June 20, 2021 at 19:30
          </p>
          <Button>More</Button>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Slider;
