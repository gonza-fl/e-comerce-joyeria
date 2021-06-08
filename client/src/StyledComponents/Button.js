import React from 'react';
import styled from 'styled-components';

function Button({text}) {
    return (
        <StyledButton>{text}</StyledButton>
    );
}

const StyledButton = styled.button`
    border-style: none;
    background-color: rgb(233, 185, 185);
    color: white;
    padding: 10px;
    font-size: 105%;

    &:hover {
        cursor: pointer;
        background-color: white;
        color: rgb(233, 185, 185);
    }
`

export default Button;