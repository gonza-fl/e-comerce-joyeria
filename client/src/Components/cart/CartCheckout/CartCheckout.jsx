/* eslint linebreak-style: ["error", "windows"] */
import React from 'react';
import { useSelector } from 'react-redux';

const CartCheckout = () => {
  const userStatus = useSelector((state) => state.user);

  if (Object.keys(userStatus).length === 0 || userStatus === null) {
    // userStatus es el objeto 'user' del reducer. La condición evalúa si tiene alguna key.
    // Si no la tiene, va a devolver 0. En este caso quiero que salte el pop up
    document.getElementById('login').style.display = 'block';
  } else {
    // caso en que el user del reducer tiene una key (el usuario está logueado)
    return (<div>Usuario logueado, este seria el momento de pagar?</div>);
  }
  return (
    <p>escribi esto porque sino eslint no me dejaba renderizar</p>
  );
};

export default CartCheckout;
