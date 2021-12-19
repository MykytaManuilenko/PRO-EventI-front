import { React, useState } from "react";
import "./Filters.scss";
import Dropdown from "../../../UI/Dropdown/Dropdown";
import axiosInstance from "../../../../utils/axiosInstance";
import { useEffect } from "react";

const Filters = () => {
  const [filters, setFilters] = useState([]);
  //добавить данные с базы!!!
  // const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState(false);
  const [data, setData] = useState(false);
  const [location, setLocation] = useState(false);

  const listOfFilter = ["Type", "Data", "Location"];
  // const options = [
  //   { value: 1, label: "Type" },
  //   { value: 2, label: "Data" },
  //   { value: 3, label: "Music" },
  // ];
  //   const options = [{name: 'Option 1️', id: 1},{name: 'Option 2️', id: 2}]
  useEffect(() => {
    axiosInstance
      .get("/api/events/type", { params: { type: ["music", "event"] } })
      .then((res) => {
        console.log("res :>> ", res);
      })
      .catch((err) => {
        console.log("errFilters :>> ", err);
      });
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
  };
  const name = [];
  listOfFilter.map((names) => name.push(names));
  // console.log("name :>> ", name);

  return (
    <div className="Filters">
      {/* menuIsOpen={true} defaultValue={options[1]} */}
      {/* <Select options={options} isMulti components={{Option}} closeMenuOnSelect={false} placeholder={name[0]}></Select>
          <Select options={options} components={{Option}} closeMenuOnSelect={false} placeholder={name[1]}></Select>
          <Select options={options} components={{Option}} closeMenuOnSelect={false} placeholder={name[2]}></Select>
          <Select options={options} components={{Option}} closeMenuOnSelect={false} placeholder={name[3]}></Select> */}

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
        open={data}
        clicked={() => {
          setType(false);
          setData(!data);
          setLocation(false);
        }}
        handleChange={handleFilters}
      >
        {name[1]}
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
