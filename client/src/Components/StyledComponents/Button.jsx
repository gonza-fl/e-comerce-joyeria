/* eslint react/prop-types: 0 */
import React from 'react';
import styled from 'styled-components';

function Button({
  text, handleClick, style, type,
}) {
  return (
    <StyledButton
      style={style}
      className="bg-color-three font-color-seven"
      onClick={handleClick}
      type={type || ''}
    >
      {text}
    </StyledButton>
  );
}

const StyledButton = styled.button`
    border-style: none;
    color: black;
    padding: 10px;
    font-size: 105%;
    transition: 0.5s;

    &:hover {
        cursor: pointer;
        background-color: #CF988C;
    }
`;

export default Button;
