/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';

const Cart = () => {
  const cartProducts = JSON.parse(localStorage.getItem('cart'));
  const shipping = 200;
  const tax = 50;
  let operation = 0;

  for (let i = 0; i < cartProducts.length; i++) {
    const productPrice = cartProducts.map((product) => product.price);
    const productAmount = cartProducts.map((product) => product.amount);
    operation += productPrice[i] * productAmount[i];
  }
  const [subTotal, setSubtotal] = useState(operation);
  const [total, setTotal] = useState(subTotal + shipping + tax);

  const sumAmount = (id) => {
    const index = cartProducts.findIndex((product) => product.id === id);
    cartProducts[index].amount += 1;
    localStorage.setItem('cart', JSON.stringify(cartProducts));
    //
    setSubtotal((prevState) => prevState + cartProducts[index].price);
  };

  const substractAmount = (id) => {
    const index = cartProducts.findIndex((product) => product.id === id);
    if (cartProducts[index].amount > 0) {
      cartProducts[index].amount -= 1;
      localStorage.setItem('cart', JSON.stringify(cartProducts));
      setSubtotal((prevState) => prevState - cartProducts[index].price);
    }
  };

  if (cartProducts) {
    return (
      <div>
        <div className="cart-container">
          <h2>Carrito de Compras</h2>
          <div>
            {cartProducts.map((product) => (
              <div>
                <img src={product.images[0].url} alt={product.name} />
                <div>
                  <h4>{product.name}</h4>
                  <p>{product.description}</p>
                  <h5>{product.price}</h5>
                </div>
                <div>
                  <p>{product.amount}</p>
                  <button onClick={() => sumAmount(product.id)}>+</button>
                  <button onClick={() => substractAmount(product.id)}>-</button>
                </div>
              </div>
            ))}
          </div>
          <button>Siguiente</button>
          <button>Volver al Catálogo</button>
        </div>
        <div className="summary-container">
          <h2>Resumen</h2>
          <div>
            <h4>{subTotal}</h4>
            <h4>{shipping}</h4>
            <h4>{tax}</h4>
          </div>
          <h2>{total}</h2>
        </div>
      </div>
    );
  }
  return (
    <div>
      <h5>Tu carrito de compras está vacío!!</h5>
    </div>
  );
};

export default Cart;
