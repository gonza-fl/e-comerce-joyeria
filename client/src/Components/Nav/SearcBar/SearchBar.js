import React, { useState, useEffect } from 'react';
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

    useEffect(() => {
        dispatch(getProducts())
    }, [])

    useEffect(() => {
        console.log(products);
        if(input.trim().length >= 1) {
            getResults();
        } else {
            setResults([]);
        }
    }, [input]);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const getResults = () => {
        let inputMatch = input.substring(0, input.trim().length);
        setResults(products.filter(product => product.name.toLowerCase().startsWith(inputMatch)));
        console.log(results);
    }

    const handleQueryResultClick = (e) => {
        const query = e.target.innerText.toLowerCase();
        dispatch(getProductsByName(query));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`searching ${input} ...`);
        document.getElementById('searchBar').reset()
        dispatch(getProductsByName(input));
        setInput('');
    };

    return (
        <div className='searchBar'>
            <form id='searchBar' onSubmit={handleSubmit}>
                <input className='searchInput' type="text" name="products" value={input} placeholder="Search..." onChange={handleInputChange} />
                <Button 
                text = {<FaSearch className = { 'font-color-seven' } style={{fontSize: '110%'}}/>}/> 
            </form>

            <SearchBarDropdown 
                results = {results}
                handleQueryResultClick = {handleQueryResultClick}
            />
        </div>
    )
}