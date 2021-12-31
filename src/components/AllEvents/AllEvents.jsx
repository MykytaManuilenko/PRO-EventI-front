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
  const { notFound } =
    location.state && location.state.notFound ? location.state : {};
  const { searchValue } =
    location.state && location.state.searchValue ? location.state : {};
  // const [filteredSearch, setFilteredSearch] = useState(
  //   filtered ? filtered : cardsArray
  // );

  return (
    <>
      <div className="main">
        <SearchPart
          cname="searchPart"
          events={cardsArray}
          pathName={"/allEvents"}
        />
        <div className="TitlePart">
          <p className="Title">
            All events{searchValue ? `: ${searchValue}` : ""}
          </p>
          <hr className="Line" />
        </div>
        <div className="CardsContainer">
          {!filtered
            ? cardsArray.map((card) => {
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
              })
            : filtered.map((event) => {
                return (
                  <Card
                    image={event.backgroundUrl}
                    name={event.title}
                    date={convertData(event.startTime)}
                    key={event.eventId}
                    isLiked={event.isLiked}
                    eventId={event.eventId}
                  />
                );
              })}
          {/* {filtered.length === 0 && <p>{notFound}</p>} */}

          {/* {isMatch ? (
            filteredSearch.map((event, index) => {
              return (
                <Card image={event.image} name={event.name} date={event.date} />
              );
            })
          ) : (
            <h3>Not found</h3>
          )} */}
        </div>
      </div>
    </>
  );
};

export default AllEvents;
