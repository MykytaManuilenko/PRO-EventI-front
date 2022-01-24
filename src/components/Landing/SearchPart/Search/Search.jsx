import React, { useState } from "react";
import "./Search.scss";
import { Link } from "react-router-dom";
import { SearchIcon } from "../../../../assets/icons";

const Search = (props) => {
  let filtered = [];
  const [search, setSearch] = useState("");
  let notFound = "";

  const searchFilter = () => {
    props.events.filter((event) => {
      if (search === "") {
        filtered.push(event);
        setSearch("");
        return filtered;
      } else if (event.title.toLowerCase().includes(search.toLowerCase())) {
        filtered.push(event);
        return filtered;
      } else if (!event.title.toLowerCase().includes(search.toLowerCase())) {
        notFound = "Not found any event :(";
        return "notFound";
      }
    });
  };
  return (
    <div className="Search">
      <div className="Input">
        <input
          type="text"
          className="SearchInput"
          onChange={(event) => {
            setSearch(event.target.value);
          }}
          placeholder="search"
        />
        <label className="InputLabel">Search...</label>
      </div>

      <Link
        className="LinkSearch"
        to={{
          pathname: `${props.pathName}`,
          state: {
            filtered: filtered,
            searchValue: search,
            notFound: notFound,
          },
        }}
      >
        <button className="searchButton" onClick={searchFilter}>
          <SearchIcon className="searchIcon" />
        </button>
      </Link>
    </div>
  );
};

export default Search;
