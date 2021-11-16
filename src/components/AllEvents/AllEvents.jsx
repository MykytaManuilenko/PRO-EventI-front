import React, { useState } from "react";
import Card from "../UI/Card/Card";
import "./AllEvents.scss";
import SearchPart from "../Landing/SearchPart/SearchPart";
import { useLocation } from "react-router-dom";

const AllEvents = () => {
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

  const [search, setSearch] = useState("");
  const [isMatch, setIsMatch] = useState(true);

  // useEffect(() => {
  //   getAllEvents("/events"); //route который будет у Никиты на беке
  // });

  // функция которая достает event с route
  // const getAllEvents = (url) => {
  //   axios
  //     .get(url)
  //     .then((res) => {
  //       setEvents(res.data);
  //     })
  //     .catch((err) => console.error("Error during uploading events " + err));
  // };

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
          // isMatch={isMatch}
          cname="searchPart"
          // setIsMatch={setIsMatch}
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
