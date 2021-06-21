/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { URL_CART, URL_GET_CART } from '../../../constants';
import Button from '../../StyledComponents/Button';
import './Cart.css';

const Cart = () => {
  const user = useSelector((state) => state.user);
  const [cartProducts, setCartProducts] = useState([]);
  const [pivot, setPivot] = useState(false);

  useEffect(() => {
    if (user.id) {
      axios.get(`${URL_GET_CART}${user.id}/cart`)
        .then((res) => { setCartProducts(res.data[0].products.map((p) => ({ ...p, amount: p.orderline.amount }))); });
    } else {
      setCartProducts(JSON.parse(localStorage.getItem('cart')));
    }
  }, [user, pivot]);

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

  function changeAmount(id, type, amount = 0) {
    if (user.id) {
      return axios.put(`${URL_GET_CART}${user.id}/cart`, { product: { id, amount }, action: type })
        .then(() => setPivot(!pivot));
    }

    const index = cartProducts.findIndex((product) => product.id === id);
    if (cartProducts[index].amount > 1) {
      cartProducts[index].amount += type === 'set' ? amount - cartProducts[index].amount : amount;
      localStorage.setItem('cart', JSON.stringify(cartProducts));

      if (type === 'sum') {
        setSubtotal((prevState) => prevState + cartProducts[index].price);
        setTotal((prevState) => prevState + cartProducts[index].price);
      }

      if (type === 'substract') {
        setSubtotal((prevState) => prevState - cartProducts[index].price);
        setTotal((prevState) => prevState - cartProducts[index].price);
      }
    }
  }

  const deleteFromCart = (id) => {
    if (user.id) {
      axios.delete(`${URL_CART}empty`, { data: { id: user.id, product: { id } } })
        .then(() => { setPivot(!pivot); })
        .catch((err) => console.log(err));
    } else {
      const index = cartProducts.findIndex((product) => product.id === id);
      const pricePerAmount = cartProducts[index].price * cartProducts[index].amount;
      setSubtotal((prevState) => prevState - pricePerAmount);
      setTotal((prevState) => prevState - pricePerAmount);
      cartProducts.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cartProducts));
    }
  };
  if (cartProducts.length === 0) {
    return (
      <div>
        <h5>Tu carrito de compras está vacío!!</h5>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-detail-container">
        <h2>Carrito de Compras</h2>
        <div className="card-detail-border">
          {cartProducts.map((product) => (
            <div className="card-detail-map">
              <div className="card-detail-map-left">
                <div className="card-detail-img-container">
                  <img src={product.images.length && product.images[0].url} alt={product.name} />
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
                        () => (product.amount < product.stockAmount ? changeAmount(product.id, 'sum') : swal('Lo sentimos!', 'no hay stock suficiente para seguir sumando'))
}
                    >+
                    </button>
                    <button onClick={() => changeAmount(product.id, 'substract')}>-</button>
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
};

export default Cart;
