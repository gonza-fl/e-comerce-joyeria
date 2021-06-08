import React from 'react';
import StyledButton from '../../StyledComponents/Button';


export function ProductCard({id, name, price, image, review}) {
  return (
    <div>
        <img src={`${image}`} alt='Image not found' width='250px' height='250px'/>
        <h3>{name}</h3>
        <span>$ {price}</span><br/>
        <StyledButton text = 'Agregar al carrito'/>
    </div>
  );
};