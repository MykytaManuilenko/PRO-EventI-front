import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../Navigation/NavBar/NavBar";
import Footer from "../Navigation/Footer/Footer";
import Card from "../UI/Card/Card";
import "./AllEvents.scss";
import SearchPart from "../Landing/SearchPart/SearchPart";

const AllEvents = () => {
  const cardsArray = [
    { image: "./image1.png", name: "Classic concert", date: "16 May, 2021" },
    { image: "./image2.png", name: "Classic concert", date: "16 May, 2021" },
    { image: "./image3.png", name: "Classic concert", date: "16 May, 2021" },
    { image: "./image2.png", name: "Classic concert", date: "16 May, 2021" },
    { image: "./image1.png", name: "Classic concert", date: "16 May, 2021" },
    { image: "./image3.png", name: "Classic concert", date: "16 May, 2021" },
    { image: "./image2.png", name: "Classic concert", date: "16 May, 2021" },
    { image: "./image3.png", name: "Classic concert", date: "16 May, 2021" },
    { image: "./image1.png", name: "Classic concert", date: "16 May, 2021" },
    { image: "./image2.png", name: "Classic concert", date: "16 May, 2021" },
  ];

  return (
    <>
      <NavBar cname="eventsNav"></NavBar>

      <div className="main">
        <SearchPart cname="searchPart"></SearchPart>
        <div className="TitlePart">
          <p className="Title">Search results for: </p>
          <hr className="Line" />
        </div>
        <div className="CardsContainer">
          {/* карточки доставать из базы, 
          и сделать проверку чтобы больше 3 рядов не добавляло */}
          {cardsArray.map((event, index) => {
            return (
              <Card image={event.image} name={event.name} date={event.date} />
            );
          })}
        </div>
      </div>

      <Footer></Footer>
    </>
  );
};

export default AllEvents;
