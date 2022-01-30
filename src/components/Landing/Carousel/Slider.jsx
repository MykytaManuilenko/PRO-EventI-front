import { React, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "./Carousel.scss";
import Button from "../../UI/Button/Button";
import SearchPart from "../SearchPart/SearchPart";
import { useEffect } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { convertData } from "../../../utils/convertDate";
import Search from "../Search/Search";

const Slider = (props) => {
  // const [events, setEvents] = useState();
  const [topEvents, setTopEvents] = useState();
  const [eventsCopy, setEventsCopy] = useState();

  useEffect(() => {
    axiosInstance
      .get("/api/events", { params: { limit: 3 } })
      .then((res) => {
        console.log("resSlider :>> ", res);
        setTopEvents(res.data);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
    // axiosInstance
    //   .get("/api/events")
    //   .then((res) => {
    //     console.log("allEvents :>> ", res);
    //     setEvents(res.data);
    //     setEventsCopy(res.data);
    //   })
    //   .catch((err) => {
    //     console.log("err :>> ", err);
    //   });
  }, []);
  console.log("eventsSlider :>> ", props.events);
  return (
    <div className="containerCarousel">
      <Carousel indicators={false} interval={null} className="Carousel">
        {topEvents &&
          topEvents.map((event, key) => {
            return (
              <Carousel.Item key={key}>
                <img
                  src={event.backgroundUrl}
                  alt="First slide"
                  style={{ filter: "brightness(50%)" }}
                />
                <Carousel.Caption className="name">
                  <p className="boldHeader">{event.title}</p>
                  <p className="smallText">By Marvin McKinney</p>
                  <p className="locText">Date&Time</p>
                  <p className="smallText">{convertData(event.startTime)}</p>
                  <Button>More</Button>
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
      </Carousel>
      <Search
        className="landingSearch"
        events={props.events && props.events}
        setEventsCopy={props.setEventsCopy}
        isNotAuth={true}
      />
    </div>
  );
};

export default Slider;
