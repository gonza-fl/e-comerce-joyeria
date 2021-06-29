/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './LeftMenu.css';

export default function LeftMenu({ user }) {
  const categories = useSelector((state) => state.categories);
  const [userData, setUserData] = useState({ role: '' });
  useEffect(() => {
    if (user.id) {
      axios.get(`http://localhost:3001/api/user/${user.id}`)
        .then((res) => setUserData(res.data));
    }
  }, []);
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
      {userData.role === 'admin' || userData.role === 'superAdmin' ? (
        <Link to="/admin" className="link-without-styles">
          <ul style={{ color: 'blue' }}>ADMINISTRADOR</ul>
          {' '}
        </Link>
      ) : null}
    </div>
  );
}
