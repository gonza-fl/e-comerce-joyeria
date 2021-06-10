import React, { useState, useEffect, useRef } from 'react';
import './SearchBar.css';
import { FaSearch } from 'react-icons/fa';
import Button from '../../../StyledComponents/Button';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts, getProductsByName } from '../../../actions/actions';
import SearchBarDropdown from './SearchBarDropdown/SearchBarDropdown';

export default function SearchBar() {

    const [input, setInput] = useState('');
    const [results, setResults] = useState([]);
    const products = useSelector(state => state.products);
    const dispatch = useDispatch();

    const[open, setOpen] = useState(false);
    const node = useRef();
    
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
        dispatch(getProducts())
    }, [])

    useEffect(() => {
        if(input.trim().length >= 1) {
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
        dispatch(getProductsByName(query));
        setInput(query);
        setOpen(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`searching ${input} ...`);
        document.getElementById('searchBar').reset()
        dispatch(getProductsByName(input));
        setInput('');
    };

    return (
        <div className='searchBar' ref={node}>
            <form id='searchBar' onSubmit={handleSubmit}>
                <input className='searchInput' autoComplete='off' type="text" name="products" value={input} placeholder="Search..." onChange={handleInputChange} />
                <Button 
                text = {<FaSearch className = { 'font-color-seven' } style={{fontSize: '110%'}}/>}/> 
            </form>
            <div>
                {open && (
                    <SearchBarDropdown 
                        results = {results}
                        handleQueryResultClick = {handleQueryResultClick}
                    />
                )}
            </div>
        </div>
    )
}