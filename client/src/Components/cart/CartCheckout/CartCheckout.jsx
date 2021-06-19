/* eslint-disable no-return-assign */
import React from 'react';
import { useSelector } from 'react-redux';
import Button from '../../StyledComponents/Button';

export default function CartCheckout() {
  const userStatus = useSelector((state) => state.user);

  if (!Object.keys(userStatus).length) document.getElementById('login').style.display = 'block';

  if (!Object.keys(userStatus).length) {
    return (
      <div>
        <h3>Por favor, para continuar inicie sesión</h3>
        <Button text="Iniciar Sesión" handleClick={() => document.getElementById('login').style.display = 'block'} />
      </div>
    );
  }

  return (
    <div>
      es por aca
    </div>
  );
}
