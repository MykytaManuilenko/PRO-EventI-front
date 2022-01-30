import React, { useState } from "react";
import Input from "../../UI/Input/Input";
import LocationAuto from "../../UI/LocationAuto/LocationAuto";
import "./Search.scss";
import { SearchIcon } from "../../../assets/icons";
import Dropdown from "../../UI/Dropdown/Dropdown";
import { useEffect } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { useHistory } from "react-router-dom";

const Search = (props) => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState([]);
  const [types, setTypes] = useState();
  const [clicked, setClicked] = useState(false);
  const [address, setAddress] = useState({
    country: "",
    city: "",
    street: "",
  });
  const history = useHistory();

  console.log("eventsSearch :>> ", props.events);
  const handleSearch = () => {
    const filtered = [];
    props.events.filter((event) => {
      if (search === "") {
        filtered.push(event);
        return filtered;
      } else if (event.title.toLowerCase().includes(search.toLowerCase())) {
        filtered.push(event);
        return filtered;
      } else if (!event.title.toLowerCase().includes(search.toLowerCase())) {
        // props.setNotFound();
      }
    });
    let data = {};
    if (filters.length !== 0 && address.city !== "") {
      data = {
        type: filters.toString(),
        city: address.city,
      };
    } else if (address.city !== "") {
      data = {
        city: "Варшава",
      };
    } else if (filters.length !== 0) {
      data = {
        type: filters.toString(),
      };
    }

    axiosInstance
      .get("/api/events", { params: data })
      .then((res) => {
        console.log("res :>> ", res);
        const filteredEvents = filtered.filter((event) =>
          res.data.some((resData) => resData.eventId === event.eventId)
        );
        props.setIsFiltered &&
          props.setIsFiltered(
            filters.length === 0 &&
              search.length === 0 &&
              address.country === ""
              ? false
              : true
          );
        props.setEventsCopy(filteredEvents);
        console.log("filteredEvents :>> ", filteredEvents);
        if (props.isNotAuth === true) {
          history.push({
            pathname: "/allEvents",
          });
        }
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  };

  const handleFilter = (eventValue) => {
    const filtersCopy = [...filters];
    console.log("eventValue :>> ", eventValue);

    if (filtersCopy.includes(eventValue)) {
      const index = filtersCopy.indexOf(eventValue);
      filtersCopy.splice(index, 1);
      setFilters(filtersCopy);
    } else {
      filtersCopy.push(eventValue);
      console.log("filtersCopy :>> ", filtersCopy);
      setFilters(filtersCopy);
    }
  };
  useEffect(() => {
    axiosInstance
      .get("/api/event-types")
      .then((res) => {
        console.log("res :>> ", res);
        setTypes(res.data);
        // if (props.isAuth === true) {
        //   history.push({
        //     pathname: "/allEvents",
        //   });
        // }
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  }, []);
  return (
    <div className={["searchContainer", props.className].join(" ")}>
      <div className="inputs">
        <Input
          onChange={(event) => setSearch(event.target.value)}
          onBlur={(event) => setSearch(event.target.value)}
          value={search}
          name="search"
          type="text"
          placeholder="Search..."
          labelName="Search..."
          className={props.isAuth ? "inputsStyle" : "notAuthInputsStyle"}
        />
      </div>
      <Dropdown
        types={types}
        open={clicked}
        clicked={() => {
          setClicked(!clicked);
        }}
        filteredValues={filters}
        handleChange={handleFilter}
        isAuth={props.isAuth}
      >
        Type
      </Dropdown>
      <div className={props.isAuth ? "locationInput" : "notAuthLocationInput"}>
        <LocationAuto
          setAddress={setAddress}
          className={props.isAuth ? "locationInput" : "notAuthLocationInput"}
          labelClass="labels"
          label="Where"
          isSearch={true}
        />
      </div>

      <button
        className={props.isAuth ? "searchButton" : "notAuthSearchButton"}
        onClick={handleSearch}
      >
        <SearchIcon className="searchIcon" />
      </button>
    </div>
  );
};

export default Search;
