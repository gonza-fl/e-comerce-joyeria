/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './LeftMenu.css';

export default function LeftMenu({ userData }) {
  const categories = useSelector((state) => state.categories);

  return (
    <div className="leftMenuCtn">
      <ul className="categoryTablet">
        CATEGORIAS
        <div className="bg-color-six">
          {categories.map((d) => (
            <Link to={`/products/${d.id}`} key={d.name}>
              <li className="optionLeftMenu">{d.name.toUpperCase()}</li>
            </Link>
          ))}
        </div>
      </ul>
      <Link to="/justdiscounted" className="link-without-styles">
        <ul className="ulTablet">OFERTAS</ul>
      </Link>
      <ul className="ulTablet">ARTE</ul>
      <ul className="ulTablet">NUEVO</ul>
      {userData && (userData.role === 'admin' || userData.role === 'superAdmin' ? (
        <Link to="/admin" className="link-without-styles">
          <ul className="ulTablet" style={{ color: 'blue' }}>ADMINISTRADOR</ul>
          {' '}
        </Link>
      ) : null)}
    </div>
  );
}
