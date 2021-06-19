/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint react/prop-types: 0 */
/* eslint linebreak-style: ["error", "windows"] */
import React from 'react';
import './SearchBarDropdown.css';

const SearchBarDropdown = ({ results, handleQueryResultClick }) => {
  const queryOptions = results.map((result) => (
    <li className="dropdown-li" key={result.id} onClick={(e) => handleQueryResultClick(e)}>{result.name}</li>
  ));

  return (
    queryOptions.length === 0 ? null
      : <ul className="searchbar-dropdown">{queryOptions}</ul>
  );
};

export default SearchBarDropdown;
