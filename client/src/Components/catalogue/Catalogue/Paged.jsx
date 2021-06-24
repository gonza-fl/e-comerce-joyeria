/* eslint-disable react/prop-types */
import React from 'react';
import StyledButton from '../../StyledComponents/Button';

export default function Paged({ products, page, onClick }) {
  return (
    <div className="nextBack">
      {page !== '1' ? <StyledButton text="< Anterior" handleClick={() => onClick(-1)} /> : <StyledButton text="< Anterior" style={{ color: '#CF988C' }} /> }
      <StyledButton text={page || 'X'} />
      {(Number(page) === Math.floor(products.length / 6) && products.length % 6 === 0)
    || (Number(page) - 1 === Math.floor(products.length / 6))
        ? <StyledButton text="Siguiente >" style={{ color: '#CF988C' }} /> : <StyledButton text="Siguiente >" handleClick={() => onClick(1)} />}
    </div>
  );
}
