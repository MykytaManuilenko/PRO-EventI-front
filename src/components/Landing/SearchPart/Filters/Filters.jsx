import {React, useState} from "react";
import "./Filters.scss";
import Dropdown from "../../../UI/Dropdown/Dropdown";

const Filters = () => {
  //добавить данные с базы!!!
  // const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState(false);
  const [data, setData] = useState(false);
  const [location, setLocation] = useState(false);
  const [price, setPrice] = useState(false);

  const listOfFilter = ["Type", "Data", "Location", "Price"];
  const types = ["All type", "Music", "Dance", "Science"];

  const name = [];
  listOfFilter.map((names) => name.push(names))
  console.log('name :>> ', name);

  return (
    <div className="Filters">
      <Dropdown
            types={types} open={type} clicked={() => {setType(!type); setData(false); setLocation(false); setPrice(false)}}>
            {name[0]}
      </Dropdown>  
      <Dropdown
            types={types} open={data} clicked={() => {setType(false); setData(!data); setLocation(false); setPrice(false)}}>
            {name[1]}
      </Dropdown>  
      <Dropdown
            types={types} open={location} clicked={() => {setType(false); setData(false); setLocation(!location); setPrice(false)}}>
            {name[2]}
      </Dropdown> 
      <Dropdown
            types={types} open={price} clicked={() => {setType(false); setData(false); setLocation(false); setPrice(!price)}}>
            {name[3]}
      </Dropdown>

    </div>
  );
};

export default Filters;
