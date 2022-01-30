import { React, useState } from "react";
import "./Filters.scss";
import Dropdown from "../../../UI/Dropdown/Dropdown";
import axiosInstance from "../../../../utils/axiosInstance";
import { useEffect } from "react";

const Filters = (props) => {
  const [filters, setFilters] = useState([]);
  const [type, setType] = useState(false);
  const [data, setData] = useState(false);
  const [location, setLocation] = useState(false);

  const listOfFilter = ["Type", "Data", "Location"];
  useEffect(() => {
    axiosInstance
      .get("/api/event-types")
      .then((res) => {
        console.log("resFilters :>> ", res);
      })
      .catch((err) => {
        console.log("errFilters :>> ", err);
      });

    // axiosInstance
    //   .get("/api/events", { params: { type: "science" } })
    //   .then((res) => {
    //     console.log("filters :>> ", res);
    //   })
    //   .catch((err) => {
    //     console.log("filters :>> ", err);
    //   });
  }, []);

  const types = ["All type", "Music", "Dance", "Science"];

  const handleFilters = (eventValue) => {
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
    console.log("filtersc", filtersCopy.toString().toLowerCase());
    props.setIsFiltered(filtersCopy.length === 0 ? false : true);
    axiosInstance
      .get(
        "/api/events",
        filtersCopy.length !== 0 && {
          params: { type: filtersCopy.toString().toLowerCase() },
        }
      )
      .then((res) => {
        console.log("filters :>> ", res);
        props.setEvents(res.data);
      })
      .catch((err) => {
        console.log("filters :>> ", err);
      });
  };
  const name = [];
  listOfFilter.map((names) => name.push(names));

  return (
    <div className="Filters">
      <Dropdown
        types={types}
        open={type}
        clicked={() => {
          setType(!type);
          setData(false);
          setLocation(false);
        }}
        handleChange={handleFilters}
      >
        {name[0]}
      </Dropdown>
      <Dropdown
        types={types}
        open={location}
        clicked={() => {
          setType(false);
          setData(false);
          setLocation(!location);
        }}
      >
        {name[2]}
      </Dropdown>
    </div>
  );
};

export default Filters;
