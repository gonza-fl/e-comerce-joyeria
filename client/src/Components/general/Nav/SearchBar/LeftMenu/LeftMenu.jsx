/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './LeftMenu.css';

export default function LeftMenu({ user }) {
  const categories = useSelector((state) => state.categories);
  const ADMIN_IDS = process.env.REACT_APP_ADMIN_IDS;
  ADMIN_IDS.split(',');
  return (
    <div className="leftMenuCtn">
      <ul>
        CATEGORIAS
        <div className="bg-color-six">
          {categories.map((d) => (
            <Link to={`/products/${d.id}`} key={d.name}>
              <li className="optionLeftMenu">{d.name.toUpperCase()}</li>
            </Link>
          ))}
        </div>
      </ul>
      <ul>TIPS</ul>
      <ul>ARTE</ul>
      <ul>NUEVO</ul>
      {ADMIN_IDS.includes(user.id) && (
      <Link to="/admin" className="link-without-styles">
        <ul style={{ color: 'blue' }}>ADMINISTRADOR</ul>
        {' '}
      </Link>
      )}
    </div>
  );
}
