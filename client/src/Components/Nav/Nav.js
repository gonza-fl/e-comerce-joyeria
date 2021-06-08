import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';
import SearchBar from './SearcBar/SearchBar';

export default function Nav() {

    return (
        <div className='nav'>
            <nav className='nav'>
                <NavLink to='/home' className='navLink'>🏠 Home</NavLink>
                <NavLink to='/contact' className='navLink'>👤</NavLink>
                <SearchBar />
            </nav>
        </div>
    )
}