import React from 'react';
import styled from 'styled-components';

function Button({text, handleClick}) {
 
    return (
        <StyledButton onClick={handleClick}>{text}</StyledButton>
    );
}

const StyledButton = styled.button`
    border-style: none;
    background-color: #f4dcd8;
    color: black;
    padding: 10px;
    font-size: 105%;

    &:hover {
        cursor: pointer;
        background-color: #f4dcd8;
        color: white;
    }
`

export default Button;