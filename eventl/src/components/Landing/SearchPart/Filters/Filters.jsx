import React, { useState } from "react";
import "./Filters.scss";
import Dropdown from "../../../UI/Dropdown/Dropdown";

const Filters = () => {
  //добавить данные с базы!!!

  const listOfFilter = ["Type", "Data", "Location", "Price"];
  const types = ["All type", "Music", "Dance", "Science"];

  return (
    <div className="Filters">
      {listOfFilter.map((names) => {
          return(
            <Dropdown
            types={types}
            listOfFilter={listOfFilter}>
            {names}
          </Dropdown>
          );
        
      })}
    </div>
  );
};

export default Filters;
