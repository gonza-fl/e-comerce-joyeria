import React from 'react';
import styled from 'styled-components';
import logo from '../img/logo.png'

function Logo({width, height}) {
 
    return (
        <div>
            <StyledImg src = {logo} width={width} height={height}/>
        </div>
    );
}

const StyledImg = styled.img`
    &:hover {
        cursor: pointer;
    }
`

export default Logo;