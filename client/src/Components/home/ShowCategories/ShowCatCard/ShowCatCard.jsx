/* eslint linebreak-style: ["error", "windows"] */
/* eslint linebreak-style: ["error", "unix"] */
/* eslint react/prop-types: 0 */
import React from 'react';
import { Link } from 'react-router-dom';
import './ShowCatCard.css';
import StyledButton from '../../../StyledComponents/Button';

export default function ShowCatCard({ id, name, img }) {
  return (
    <div className="ctnCardC">
      <Link to={`/products/${id}`}>
        <div className="headerCard">
          <img src={img} alt={name} />
        </div>
        <StyledButton text={name} />
      </Link>
    </div>
  );
}
