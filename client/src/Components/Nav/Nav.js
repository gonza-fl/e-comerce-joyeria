import React from 'react';
import SearchBar from './SearcBar/SearchBar';
import './Nav.css';
import Logo from '../../StyledComponents/Logo.js';

export default function Nav() {

    return (
        <div className='ctnNav bg-color-three'>
            <div className='nav bg-color-three'>
                <Logo width='150px' height='120px'/>
                <SearchBar />
            </div>
        </div>
    )
}