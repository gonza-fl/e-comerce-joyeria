import React, { useState, useEffect, useRef } from 'react';
import './SearchBar.css';
import { FaSearch } from 'react-icons/fa';
import Button from '../../../StyledComponents/Button';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { getProducts, getProductsByName } from '../../../actions/actions';
import SearchBarDropdown from './SearchBarDropdown/SearchBarDropdown';
import styled from 'styled-components';
import { Redirect } from 'react-router';

export default function SearchBar() {

    const [input, setInput] = useState('');
    const [results, setResults] = useState([]);
    const products = useSelector(state => state.products);
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const node = useRef();

    const [displayBar, setDisplayBar] = useState('none')
    let history = useHistory();
    const handleClick = (e) => {
        if (node.current.contains(e.target)) {
            //inside click
            setOpen(true);
            return;
        }
        //outside click
        setOpen(false);
    }

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
        }
    }, [])

    const handleInputChange = (e) => {
        setInput(e.target.value);
        setOpen(true);
    };

    const getResults = () => {
        let inputMatch = input.substring(0, input.trim().length);
        setResults(products.filter(product => product.name.toLowerCase().startsWith(inputMatch)));
    }

    const handleQueryResultClick = (e) => {
        const query = e.target.innerText.toLowerCase();
        history.push("/products?search="+query);
        dispatch(getProductsByName(query));
        setInput(query);
        setOpen(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //alert(`searching ${input} ...`);
        // document.getElementById('searchBar').reset()
        if(input.length > 0) {
            console.log('query',input)
            dispatch(getProductsByName(input));
        }
        
        // setInput('');
        setOpen(false);
        if (input) history.push("/products?search="+input);
        setInput('')
    };

    function onClickSearch(e) {
        
        setDisplayBar('inline');
        if(input.length > 0) {
           
            history.push("/products?search="+input);
            console.log('input es ',input)
            setOpen(false);
            //
            dispatch(getProductsByName(input));
            
        }
        //dispatch(getProducts());
    }

    return (
        <div className='searchBar' ref={node}>
            <form id='searchBar' onSubmit={handleSubmit}>
                <MovingInput style={{ display: `${displayBar}` }}
                    autoComplete='off' type="text" name="products" value={input} placeholder="Search..." onChange={handleInputChange} />
                <Button handleClick={onClickSearch}
                    text={<FaSearch className={'font-color-seven'} style={{ fontSize: '110%' }} />} />
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
    )
}

const MovingInput = styled.input`
            border: none;
            padding: 10px;
            border-bottom: black 1px solid;
            background: transparent;
            font-size: 20px;
            margin-right: 10px;
            animation: transitionInput 1000ms;

            &:focus {
                outline: none;
            }
            @keyframes transitionInput {
                from {
                    width: 0px;
                }
    
                to {
                    width: 240px;
                }
            }
`;
