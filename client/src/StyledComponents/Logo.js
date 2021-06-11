import React from 'react';
import styled from 'styled-components';
import logo from '../img/logo.png'
import {Link} from "react-router-dom"

function Logo({width, height}) {
 
    return (
        <div>
            <Link to="/">
            <StyledImg src = {logo} width={width} height={height}/>
            </Link>
        </div>
    );
}

const StyledImg = styled.img`
    &:hover {
        cursor: pointer;
    }
`

export default Logo;