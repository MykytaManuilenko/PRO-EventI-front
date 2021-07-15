import React from 'react';
import './Search.scss'

const Search = () => {
    return(
        <div className="Search">
            <div className="Input">
                <input type="text" className="SearchInput" />
                <label className="InputLabel">Search...</label>
            </div>
           
            <button className="searchButton">
                <img src="./search.svg" alt="" className="searchIcon" />
            </button>

        </div>
    )
}

export default Search;