import React from "react";
import { Link } from "react-router-dom";
import Button from "../../UI/Button/Button";
import Card from "../../UI/Card/Card";
import CardSlider from "../CardSlider/CardSlider";
import "./CardsPart.scss";
// import LocationAuto from "../../UI/LocationAuto/LocationAuto";

const CardsPart = () => {
  const cardsArray = [
    { image: "./image1.png", name: "Classic concert", date: "16 May, 2021", type:"Music" },
    { image: "./image2.png", name: "Dance competition", date: "16 May, 2021", type:"Dance" },
    { image: "./image3.png", name: "Classic concert", date: "16 May, 2021", type:"Dance" },
    { image: "./image2.png", name: "Classic concert", date: "16 May, 2021" },
    { image: "./image1.png", name: "Classic concert", date: "16 May, 2021" },
    { image: "./image3.png", name: "Classic concert", date: "16 May, 2021" },
    { image: "./image2.png", name: "Classic concert", date: "16 May, 2021" },
    { image: "./image3.png", name: "Classic concert", date: "16 May, 2021" },
    { image: "./image1.png", name: "Classic concert", date: "16 May, 2021" },
    { image: "./image2.png", name: "Classic concert", date: "16 May, 2021" }
  ];
  
  return (
    <div className="CardPart">
      {/* <LocationAuto /> */}
      <div className="TitlePart">
        <p className="Title">Popular events</p>
        <hr className="Line" />
      </div>
      <CardSlider />

      <Button class="ShowButton">Show all</Button>

      <div className="TitlePart">
        <p className="Title">Upcoming events</p>
        <hr className="Line" />
      </div>

      <div className="CardsContainer">
        {/* карточки доставать из базы, 
        и сделать проверку чтобы больше 3 рядов не добавляло */}

          {cardsArray.map((event, index) => {
            if(index > 8) return null;
            return(
              <Card image={event.image} name={event.name} date={event.date} />
            )
          })}
      </div>
      <Link to="/allEvents" >
        <Button class="ShowButton">Show all</Button>
      </Link>
    </div>
  );
};

export default CardsPart;
