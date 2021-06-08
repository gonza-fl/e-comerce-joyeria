import React from 'react';
import SearchBar from './SearcBar/SearchBar';
import logo from './img/logo.png';
import fbIcon from './img/fb-icon.png';
import igIcon from './img/instagram-icon.png';
import './Nav.css';

export default function Nav() {

    return (
        <div className='ctnav'>
            <a href='#'>
                <img src={logo} alt='' />
            </a>

            <SearchBar />

            <a href='#'>
                <img src={fbIcon} alt='' />
            </a>
            <a href='#'>
                <img src={igIcon} alt='' />
            </a>
        </div>
    )
}