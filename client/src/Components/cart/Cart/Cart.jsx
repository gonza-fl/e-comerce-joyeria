/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint linebreak-style: ["error", "windows"] */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import Button from '../../StyledComponents/Button';
import './Cart.css';

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
  const [showProduct, setShowProduct] = useState(false);

  const sumAmount = (id) => {
    const index = cartProducts.findIndex((product) => product.id === id);
    cartProducts[index].amount += 1;
    localStorage.setItem('cart', JSON.stringify(cartProducts));
    setSubtotal((prevState) => prevState + cartProducts[index].price);
    setTotal((prevState) => prevState + cartProducts[index].price);
  };

  const substractAmount = (id) => {
    const index = cartProducts.findIndex((product) => product.id === id);
    if (cartProducts[index].amount > 0) {
      cartProducts[index].amount -= 1;
      localStorage.setItem('cart', JSON.stringify(cartProducts));
      setSubtotal((prevState) => prevState - cartProducts[index].price);
      setTotal((prevState) => prevState - cartProducts[index].price);
    }
  };

  const deleteFromCart = (id) => {
    const index = cartProducts.findIndex((product) => product.id === id);
    const pricePerAmount = cartProducts[index].price * cartProducts[index].amount;
    setSubtotal((prevState) => prevState - pricePerAmount);
    setTotal((prevState) => prevState - pricePerAmount);
    cartProducts.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cartProducts));
    // setShowProduct(!showProduct);
  };

  if (cartProducts) {
    return (
      <div className="cart-container">
        <div className="cart-detail-container">
          <h2>Carrito de Compras</h2>
          <div className="card-detail-border">
            {cartProducts.map((product) => (
              <div className="card-detail-map">
                <div className="card-detail-map-left">
                  <div className="card-detail-img-container">
                    <img src={product.images[0].url} alt={product.name} />
                  </div>
                  <div className="card-detail-data">
                    <h4>{product.name.toUpperCase()}</h4>
                    <p>{product.description}</p>
                    <h4>${product.price}</h4>
                  </div>
                </div>
                <div className="card-detail-map-right">
                  <div className="card-detail-amount">
                    <span id="card-detail-amount-p">{product.amount}</span>
                    <div className="card-detail-amount-buttons">
                      <button onClick={
                        () => (product.amount < product.stockAmount ? sumAmount(product.id) : swal('Lo sentimos!', 'no hay stock suficiente para seguir sumando'))
}
                      >+
                      </button>
                      <button onClick={() => substractAmount(product.id)}>-</button>
                    </div>
                  </div>
                  <button id="card-detail-delete-btn" onClick={() => deleteFromCart(product.id)}>✖</button>
                </div>
              </div>
            ))}
          </div>
          <Link to="/cart/checkout">
            <button id="next-btn">Siguiente</button>
          </Link>
          <Link to="/products">
            <Button text="Volver al Catálogo" />
          </Link>
        </div>
        <div className="cart-summary-container">
          <h2>Resumen</h2>
          <div className="cart-summary-border">
            <div className="cart-summary-data">
              <h4>Subtotal: </h4>
              <h4>${subTotal}</h4>
            </div>
            <div className="cart-summary-data">
              <h4>Envío: </h4>
              <h4>${shipping}</h4>
            </div>
            <div className="cart-summary-data">
              <h4>Impuestos: </h4>
              <h4>${tax}</h4>
            </div>
          </div>
          <div className="cart-summary-data">
            <h2>TOTAL: </h2>
            <h2>${total}</h2>
          </div>
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
