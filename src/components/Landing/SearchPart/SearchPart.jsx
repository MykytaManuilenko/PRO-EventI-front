import React from 'react';
import Search from './Search/Search';
import './SearchPart.scss'
import Filters from './Filters/Filters'

const SearchPart = (props) => {
    return(
        <div className={"SearchPart " + props.cname}>
            <Search/>
            <Filters/>
        </div>
    )
}

export default SearchPart;