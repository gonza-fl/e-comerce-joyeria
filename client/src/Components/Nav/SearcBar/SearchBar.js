import React, { useState } from 'react';
import './SearchBar.css';
import { FaSearch } from 'react-icons/fa';
import Button from '../../../StyledComponents/Button';

export default function SearchBar() {


    const [input, setInput] = useState('');
    const [results, setResults] = useState([]);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`searching ${input} ...`);
        document.getElementById('searchBar').reset()

    };

    return (
        <div className='searchBar'>
            <form id='searchBar' onSubmit={handleSubmit}>
                <input className='searchInput' type="text" placeholder="Search..." onChange={handleInputChange} />
                <Button 
                text = {<FaSearch className = { 'font-color-seven' } style={{fontSize: '110%'}}/>}/> 
            </form>
        </div>
    )
}