import React from 'react';

const SearchBarDropdown = ({results, handleQueryResultClick}) => {
    const queryOptions = results.map(result => (
        <li className="searchbar-dropdown" key={result.id} onClick={(e) => handleQueryResultClick(e)}>{result.name}</li>
    )) 

    return(
        <ul>{queryOptions}</ul>
    )
}

export default SearchBarDropdown;