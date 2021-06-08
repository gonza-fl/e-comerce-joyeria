import React, { useState } from 'react';
import './SearchBar.css';

export default function SearchBar() {


    const [input, setInput] = useState('');

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
                <input className='searchBtn' type="submit" value='🔍' />
            </form>
        </div>
    )
}