import React from "react";
import Search from "./Search/Search";
import "./SearchPart.scss";
import Filters from "./Filters/Filters";

const SearchPart = (props) => {
  return (
    <div className={"SearchPart " + props.cname}>
      <Search
        // isMatch={props.isMatch}
        // setIsMatch={props.setIsMatch}
        search={props.search}
        setSearch={props.setSearch}
        eventInfo={props.eventInfo}
        setEvent={props.setEvent}
      />
      <Filters />
    </div>
  );
};

export default SearchPart;
