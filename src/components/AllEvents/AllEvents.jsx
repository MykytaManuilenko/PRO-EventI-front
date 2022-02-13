import React, { useEffect, useState } from "react";
import Card from "../UI/Card/Card";
import "./AllEvents.scss";
import SearchPart from "../Landing/SearchPart/SearchPart";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { convertData } from "../../utils/convertDate";
import Search from "../Landing/Search/Search";
import Loading from "../UI/Loading/Loading";

const AllEvents = () => {
  const location = useLocation();
  const { filtered } =
    location.state && location.state.filtered ? location.state : {};
  const { searchValue } =
    location.state && location.state.searchValue ? location.state : {};

  const [cardsArray, setCardsArr] = useState();
  const [eventsCopy, setEventsCopy] = useState(filtered ? filtered : []);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/api/events")
      .then((res) => {
        console.log("res :>> ", res);
        setCardsArr(res.data);
        setEventsCopy(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  }, []);

  localStorage.setItem("search", search);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <div className="main">
        <Search events={cardsArray} setEventsCopy={setEventsCopy} />
        <div className="TitlePart">
          <p className="Title">
            All events{searchValue ? `: ${searchValue}` : ""}
          </p>
          <hr className="Line" />
        </div>
        <div className="CardsContainer">
          {cardsArray &&
            eventsCopy.map((event) => {
              return (
                <Card
                  key={event.eventId}
                  image={event.backgroundUrl}
                  name={event.title}
                  date={convertData(event.startTime)}
                  eventId={event.eventId}
                  isLiked={event.isLiked}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};

export default AllEvents;
