import React from 'react';
import './SearchBarDropdown.css';

const SearchBarDropdown = ({results, handleQueryResultClick}) => {

    const queryOptions = results.map(result => (
        <li className="dropdown-li" key={result.id} onClick={(e) => handleQueryResultClick(e)}>{result.name}</li>
    )) 

    return(
        queryOptions.length === 0 ? null :
        <ul className="searchbar-dropdown">{queryOptions}</ul>
    )
}

export default SearchBarDropdown;