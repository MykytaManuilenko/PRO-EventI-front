import { React, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "./Carousel.scss";
import Button from "../../UI/Button/Button";
import SearchPart from "../SearchPart/SearchPart";

const Slider = () => {
  const [cardsArray, setCardsArr] = useState([
    {
      image: "./image1.png",
      name: "Classic concert",
      date: "16 May, 2021",
      type: "Music",
    },
    {
      image: "./image2.png",
      name: "Dance competition",
      date: "16 May, 2021",
      type: "Dance",
    },
    {
      image: "./image3.png",
      name: "DONDON",
      date: "16 May, 2021",
      type: "Music",
    },
    {
      image: "./image2.png",
      name: "CIIIII",
      date: "16 May, 2021",
      type: "Science",
    },
    {
      image: "./image1.png",
      name: "CII",
      date: "16 May, 2021",
      type: "Science",
    },
    {
      image: "./image3.png",
      name: "Classic concert",
      date: "16 May, 2021",
      type: "Music",
    },
    {
      image: "./image2.png",
      name: "Classic concert",
      date: "16 May, 2021",
      type: "Music",
    },
    {
      image: "./image3.png",
      name: "Classic concert",
      date: "16 May, 2021",
      type: "Music",
    },
    {
      image: "./image1.png",
      name: "Classic concert",
      date: "16 May, 2021",
      type: "Music",
    },
    {
      image: "./image2.png",
      name: "Classic concert",
      date: "16 May, 2021",
      type: "Music",
    },
  ]);

  const [filteredSearch, setFilteredSearch] = useState(cardsArray);

  const [search, setSearch] = useState("");

  localStorage.setItem("search", search); //добавление значения в поиске в local storage
  console.log("filteredSearchInSlider :>> ", filteredSearch);

  return (
    <div className="containerCarousel">
      <Carousel indicators={false} interval={null} className="Carousel">
        <Carousel.Item>
          <img src="/v2.png" alt="First slide" />
          <Carousel.Caption className="name">
            <p className="boldHeader">T-Fest concert in Warsaw</p>
            <p className="smallText">By Marvin McKinney</p>
            <p className="locText">Date&Time</p>
            <p className="smallText">June 20, 2021 at 19:30</p>
            <Button>More</Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src="/image2.png" alt="Second slide" />
          <Carousel.Caption className="name">
            <p className="boldHeader">T-Fest concert in Warsaw</p>
            <p className="smallText">By Marvin McKinney</p>
            <p className="locText">Date&Time</p>
            <p className="smallText">June 20, 2021 at 19:30</p>
            <Button>More</Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src="/image3.png" alt="Third slide" />
          <Carousel.Caption className="name">
            <p className="boldHeader">T-Fest concert in Warsaw</p>
            <p className="smallText">By Marvin McKinney</p>
            <p className="locText">Date&Time</p>
            <p className="smallText">June 20, 2021 at 19:30</p>
            <Button>More</Button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <SearchPart
        search={search}
        setSearch={setSearch}
        eventInfo={cardsArray}
        setEvent={setFilteredSearch}
        className="SearchPart"
      />
      {/* <h1>{search}</h1> */}
    </div>
  );
};

export default Slider;
