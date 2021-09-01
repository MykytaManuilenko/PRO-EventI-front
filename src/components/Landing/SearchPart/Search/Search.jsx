import React from "react";
import "./Search.scss";
import { Link } from "react-router-dom";
// import useLocalStorage from '../../../../useLocalStorage';

const Search = (props) => {
  const searchParam = localStorage.getItem('search');

//   if(searchParam !== ""){
//       props.setSearch(searchParam);
//   }
//   const [localSearch, setLocalSearch] = useLocalStorage('search', searchParam);
  const filtered = [];

  function searchFilter() {
    props.eventInfo.filter((val) => {
      if (props.search === "" ) {
        props.setEvent(props.eventInfo);
        // props.setIsMatch(true);
        return val;
      }else if (searchParam === "" && val.name.toLowerCase().includes(props.search.toLowerCase())) {
        filtered.push(val);
        console.log("val :>> ", val);
        props.setEvent(filtered);
        
        // props.setIsMatch(true);
        return filtered;
      }else if(searchParam !== "" && val.name.toLowerCase().includes(props.search.toLowerCase())){
        filtered.push(val);
        props.setEvent(filtered);
        return filtered;
      }
    });
  }

  return (
    <div className="Search">
      <div className="Input">
        <input
          type="text"
          className="SearchInput"
          onChange={(event) => {
            props.setSearch(event.target.value);
          }}
        //   value={searchParam!=="" ? searchParam : props.search}
        // value={props.search}
        />
        <label className="InputLabel">Search...</label>
      </div>

      <Link className="LinkSearch" to={{pathname:"/allEvents", state: {filtered: filtered, searchValue: props.search}}}>
        <button className="searchButton" onClick={() => searchFilter()}>
          <img src="./search.svg" alt="" className="searchIcon" />
        </button>
      </Link>
    </div>
  );
};

export default Search;
