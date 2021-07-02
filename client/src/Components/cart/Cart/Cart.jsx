/* eslint-disable no-console */
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
import Spiner from '../../Spiner/Spiner';
import Button from '../../StyledComponents/Button';
import './Cart.css';

const Cart = () => {
  const user = useSelector((state) => state.user);
  const [cartProducts, setCartProducts] = useState([]);
  const [pivot, setPivot] = useState(false);
  const [subTotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (user.id) {
      axios.get(`${URL_GET_CART}${user.id}/cart`)
        .then((res) => {
          if (res.data[0].products.length > 0) {
            const prod = res.data[0].products.map((p) => ({ ...p, amount: p.orderline.amount })).map((p) => (p.discount > 0 ? (p.price - ((p.price * p.discount) / 100)) * p.amount : p.price * p.amount)).reduce((sum, i) => sum + i);
            setCartProducts(res.data[0].products.map((p) => ({ ...p, amount: p.orderline.amount })));
            setSubtotal(prod);
            setTotal(prod);
          } else {
            setCartProducts([]);
            setSubtotal(0);
            setTotal(0);
          }
        });
    } else if (JSON.parse(localStorage.getItem('cart'))) {
      const prod = JSON.parse(localStorage.getItem('cart'));
      if (prod && prod.length > 0) {
        const sTotal = prod.map((p) => (p.discount > 0 ? (p.price * p.amount * p.discount) / 100 : (p.price * p.amount))).reduce((sum, i) => sum + i);
        setCartProducts(prod);
        setSubtotal(sTotal);
        setTotal(sTotal);
      }
    }
  }, [user, pivot]);

  const [showProduct, setShowProduct] = useState(false);

  function changeAmount(id, type, amount = 0) {
    const index = cartProducts.findIndex((product) => product.id === id);
    if (user.id && (type !== 'substract' || (type === 'substract' && cartProducts[index].amount > 1))) {
      return axios.put(`${URL_GET_CART}${user.id}/cart`, { product: { id, amount }, action: type })
        .then(() => setPivot(!pivot));
    }

    if (type === 'sum') {
      setSubtotal((prevState) => prevState + cartProducts[index].price);
      setTotal((prevState) => prevState + cartProducts[index].price);
      cartProducts[index].amount += 1;
    }

    if (type === 'substract' && cartProducts[index].amount > 1) {
      setSubtotal((prevState) => prevState - cartProducts[index].price);
      setTotal((prevState) => prevState - cartProducts[index].price);
      cartProducts[index].amount -= 1;
    }
    localStorage.setItem('cart', JSON.stringify(cartProducts));
    setPivot(!pivot);
  }

  const deleteFromCart = (id) => {
    if (user.id) {
      axios.delete(`${URL_CART}empty`, { data: { id: user.id, product: { id } } })
        .then(() => { setPivot(!pivot); })
        .catch((err) => swal('Error', err.response.data, 'warning'));
    } else {
      const index = cartProducts.findIndex((product) => product.id === id);
      const pricePerAmount = cartProducts[index].price * cartProducts[index].amount;
      setSubtotal((prevState) => prevState - pricePerAmount);
      setTotal((prevState) => prevState - pricePerAmount);
      cartProducts.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cartProducts));
      setPivot(!pivot);
    }
  };
  if (cartProducts && cartProducts.length < 1) return <Spiner msg="Tu carrito de compras está vacío" />;

  return (
    <div className="cart-container">
      <div className="cart-detail-container">
        <h2>Carrito de Compras</h2>
        <div className="card-detail-border">
          {cartProducts.map((product) => (
            <div className="card-detail-map" key={product.name}>
              <div className="card-detail-map-left">
                <div className="card-detail-img-container">
                  <img src={product.images.length && product.images[0].url} alt={product.name} />
                </div>
                <div className="card-detail-data">
                  <h4><Link to={`/products/product/${product.id}`}>{product.name.toUpperCase()}</Link></h4>
                  <p>{product.description}</p>
                  {product.discount > 0 ? <h4><span className="priceCrossed">${product.price}</span><span className="discountt"> Descuento del %{product.discount}!!</span> <br />${(product.price - ((product.price * product.discount) / 100)).toFixed(2) } </h4> : <h4>${product.price}</h4>}
                </div>
              </div>
              <div className="card-detail-map-right">
                <div className="card-detail-amount">
                  <p id="card-detail-amount-p"> {product.amount} </p>
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
        <div className="respCartBtns">
          <Link to="/cart/checkout">
            <button id="next-btn">Siguiente</button>
          </Link>
          <Link to="/products">
            <Button text="Volver al Catálogo" />
          </Link>
        </div>
      </div>
      <div className="cart-summary-container">
        <h2>Resumen</h2>
        <div className="cart-summary-border">
          <div className="cart-summary-data" />
          <div className="cart-summary-data" />
        </div>
        <div className="cart-summary-data">
          <h2>TOTAL: </h2>
          <h2>${total.toFixed(2)}</h2>
        </div>
        <div className="respCartBtnsTablet">
          <Link to="/cart/checkout">
            <button id="next-btn">Siguiente</button>
          </Link>
          <Link to="/products">
            <Button text="Volver al Catálogo" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
