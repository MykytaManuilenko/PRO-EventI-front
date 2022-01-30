import React from "react";
import Search from "./Search/Search";
import "./SearchPart.scss";
import Filters from "./Filters/Filters";

const SearchPart = (props) => {
  return (
    <div className={"SearchPart " + props.cname}>
      <Search
        events={props.events}
        setEvents={props.setEvents}
        pathName={props.pathName}
      />
      <Filters
        setIsFiltered={props.setIsFiltered}
        setEvents={props.setEvents}
      />
    </div>
  );
};

export default SearchPart;
