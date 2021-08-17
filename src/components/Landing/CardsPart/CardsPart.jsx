import React from "react";
import Button from "../../UI/Button/Button";
import Card from "../../UI/Card/Card";
import CardSlider from '../CardSlider/CardSlider';
import "./CardsPart.scss";

const CardsPart = () => {
  return (
    <div className="CardPart">
        <div className="TitlePart">
            <p className="Title">Popular events</p>
            <hr className="Line" />

        </div>
         <CardSlider/>

        
        <Button class="ShowButton">Show all</Button>

        <div className="TitlePart">
            <p className="Title">Upcoming events</p>
            <hr className="Line" />

        </div>
      
      <div className="CardsContainer">
        {/* карточки доставать из базы, 
        и сделать проверку чтобы больше 3 рядов не добавляло */}
        <Card image="./image1.png" name="Classic concert" date="16 May, 2021" />
        <Card image="./image.png" name="Classic concert" date="16 May, 2021" />
        <Card image="./image3.png" name="Classic concert" date="16 May, 2021" />
        <Card image="./image2.png" name="Classic concert" date="16 May, 2021" />
        <Card image="./image3.png" name="Classic concert" date="16 May, 2021" />
        <Card image="./image1.png" name="Classic concert" date="16 May, 2021" />
        <Card image="./image2.png" name="Classic concert" date="16 May, 2021" />
        <Card image="./image1.png" name="Classic concert" date="16 May, 2021" />
        <Card image="./image3.png" name="Classic concert" date="16 May, 2021" />
        {/* <Card image="./image1.png" name="Classic concert" date="16 May, 2021" /> */}
      </div>
      <Button class="ShowButton">Show all</Button>
    </div>
  );
};

export default CardsPart;
