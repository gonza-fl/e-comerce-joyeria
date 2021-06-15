/* eslint linebreak-style: ["error", "windows"] */
/* eslint react/prop-types: 0 */
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../../img/logo.png';

function Logo({ width, height }) {
  return (
    <div>
      <Link to="/">
        <StyledImg src={logo} width={width} height={height} />
      </Link>
    </div>
  );
}

const StyledImg = styled.img`
    &:hover {
        cursor: pointer;
    }
`;

export default Logo;
