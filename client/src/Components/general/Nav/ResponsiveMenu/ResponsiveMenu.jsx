/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-return-assign */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { useSelector } from 'react-redux';
import './ResponsiveMenu.css';
import { Link } from 'react-router-dom';
import {
  FaHome, FaShoppingCart, FaUserAlt, FaWeightHanging, FaTimes,
} from 'react-icons/fa';

export default function ResponsiveMenu() {
  const categories = useSelector((state) => state.categories);
  const user = useSelector((state) => state.user);

  const click = () => {
    document.getElementById('respMenu').style = 'display:none';
    setTimeout(() => document.getElementById('respMenu').style = 'display:flex', 1000);
  };

  const clickLogin = () => {
    document.getElementById('login').style = 'display:block';
    click();
  };
  if (!categories.length) return <div>a</div>;
  return (
    <div id="respMenu" className="responsiveMenu">
      <span onClick={click}><FaTimes /></span>
      <Link to="/" onClick={click}><FaHome />&nbsp;Inicio</Link><hr />
      {user.id
        ? <Link to="/profile" onClick={click}><FaUserAlt />&nbsp;Mi Cuenta</Link>
        : <Link to="#login" onClick={clickLogin}><FaUserAlt />&nbsp;Iniciar sesión</Link>}
      <Link to="/cart" onClick={click}><FaShoppingCart />&nbsp;Ver carrito</Link><hr />
      <Link to="/products" onClick={click}><FaWeightHanging />&nbsp;Todos los productos</Link><hr />
      {categories.map((cat) => <Link to={`/products/${cat.id}`} onClick={click} className="respCategories">{cat.name}</Link>)}<hr />
    </div>
  );
}
