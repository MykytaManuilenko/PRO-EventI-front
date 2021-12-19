import React, { useEffect, useState } from "react";
import Card from "../UI/Card/Card";
import "./AllEvents.scss";
import SearchPart from "../Landing/SearchPart/SearchPart";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { convertData } from "../../utils/convertData";

const AllEvents = () => {
  const [cardsArray, setCardsArr] = useState([]);
  const [search, setSearch] = useState("");
  const [isMatch, setIsMatch] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/api/events")
      .then((res) => {
        console.log("res :>> ", res);
        setCardsArr(res.data);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  }, []);

  localStorage.setItem("search", search);

  const location = useLocation();

  const { filtered } =
    location.state && location.state.filtered ? location.state : {};
  const { searchValue } =
    location.state && location.state.searchValue ? location.state : {};
  const [filteredSearch, setFilteredSearch] = useState(
    filtered ? filtered : cardsArray
  );

  return (
    <>
      <div className="main">
        <SearchPart
          cname="searchPart"
          search={search}
          setSearch={setSearch}
          eventInfo={cardsArray}
          setEvent={setFilteredSearch}
        />
        <div className="TitlePart">
          <p className="Title">All events: {searchValue}</p>
          <hr className="Line" />
        </div>
        <div className="CardsContainer">
          {/* карточки доставать из базы, 
          и сделать проверку чтобы больше 3 рядов не добавляло */}
          {cardsArray &&
            cardsArray.map((card) => {
              return (
                <Card
                  image={card.backgroundUrl}
                  name={card.title}
                  eventId={card.eventId}
                  isLiked={card.isLiked}
                  key={card.eventId}
                  date={convertData(card.startTime)}
                />
              );
            })}
          {isMatch ? (
            filteredSearch.map((event, index) => {
              return (
                <Card image={event.image} name={event.name} date={event.date} />
              );
            })
          ) : (
            <h3>Not found</h3>
          )}
        </div>
      </div>
    </>
  );
};

export default AllEvents;
