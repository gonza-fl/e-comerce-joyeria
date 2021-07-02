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
      <ul className="ulTablet"><a className="link-without-styles" target="_blank" rel="noreferrer" href="https://www.instagram.com/k.mora_letters/">ARTE</a></ul>
      <ul className="ulTablet">
        <Link to="/products/" key="link" className="link-without-styles">
          <li className="optionLeftMenu">CATALOGO</li>
        </Link>

      </ul>
      {userData && (userData.role === 'admin' || userData.role === 'superAdmin' ? (
        <Link to="/admin" className="link-without-styles">
          <ul className="ulTablet" style={{ color: 'blue' }}>ADMIN</ul>
          {' '}
        </Link>
      ) : null)}
    </div>
  );
}
