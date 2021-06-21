import React, { useState, useEffect, useRef } from 'react';
import './SearchBar.css';
import { FaSearch } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { getProductsByName } from '../../../../redux/actions/actions';
import SearchBarDropdown from './SearchBarDropdown/SearchBarDropdown';
import Button from '../../../StyledComponents/Button';

export default function SearchBar() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const node = useRef();

  const [displayBar, setDisplayBar] = useState('none');
  const history = useHistory();
  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      // inside click
      setOpen(true);
      return;
    }
    // outside click
    setOpen(false);
  };

  const getResults = () => {
    const inputMatch = input.substring(0, input.trim().length);
    setResults(products.filter((product) => product.name.toLowerCase().startsWith(inputMatch)));
  };

  useEffect(() => {
    if (input) {
      getResults();
    } else {
      setResults([]);
    }
  }, [input]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setOpen(true);
  };

  const handleQueryResultClick = (e) => {
    const query = e.target.innerText.toLowerCase();
    history.push(`/products?search=${query}`);
    dispatch(getProductsByName(query));
    setInput(query);
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.length > 0) {
      dispatch(getProductsByName(input));
    }
    setOpen(false);
    if (input) history.push(`/products?search=${input}`);
    setInput('');
  };

  function onClickSearch() {
    setDisplayBar('inline');
    if (input.length > 0) {
      history.push(`/products?search=${input}`);
      setOpen(false);
      dispatch(getProductsByName(input));
    }
  }

  return (
    <div className="searchBar" ref={node}>
      <form id="searchBar" onSubmit={handleSubmit}>
        <MovingInput
          style={{ display: `${displayBar}` }}
          autoComplete="off"
          type="text"
          name="products"
          value={input}
          placeholder="Search..."
          onChange={handleInputChange}
        />
        <Button
          handleClick={onClickSearch}
          text={<FaSearch className="font-color-seven" style={{ fontSize: '110%' }} />}
        />
      </form>
      <div>
        {open && (
        <SearchBarDropdown
          results={results}
          handleQueryResultClick={handleQueryResultClick}
        />
        )}
      </div>
    </div>
  );
}

const MovingInput = styled.input`
            border: none;
            padding: 5px;
            border-bottom: black 1px solid;
            background: transparent;
            font-size: 20px;
            animation: transitionInput 2000ms;

            &:focus {
                outline: none;
            }
            @keyframes transitionInput {
                from {
                    width: 0px;
                }
    
                to {
                    width: 100%;
                }
            }
`;
