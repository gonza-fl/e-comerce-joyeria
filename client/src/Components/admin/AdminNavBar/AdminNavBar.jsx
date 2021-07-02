/* eslint-disable max-len */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './adminNavBar.css';

const AdminNavBar = () => {
  const [selected, setSelected] = useState(null);
  return (
    <div className="container">
      <ul style={{ listStyle: 'none', textAlign: 'left' }}>
        <Link to="/" className="link-without-styles"><li>VOLVER A INICIO</li></Link>
        <br />
        <Link to="/admin/products" className="link-without-styles" style={{ color: selected === 1 ? 'white' : 'inherit' }} onClick={() => setSelected(1)}>
          <li>PRODUCTOS</li>
        </Link>
        <br />
        <Link to="/admin/controlcategories" className="link-without-styles" style={{ color: selected === 2 ? 'white' : 'inherit' }} onClick={() => setSelected(2)}>
          <li>CATEGORÍAS</li>
        </Link>
        <br />
        <Link to="/admin/statistics" className="link-without-styles" style={{ color: selected === 3 ? 'white' : 'inherit' }} onClick={() => setSelected(3)}>
          <li>ESTADÍSTICAS</li>
        </Link>
        <br />
        <Link to="/admin/orders" className="link-without-styles" style={{ color: selected === 4 ? 'white' : 'inherit' }} onClick={() => setSelected(4)}>
          <li>VENTAS</li>
        </Link>
        <br />
        <Link to="/admin/users" className="link-without-styles" style={{ color: selected === 5 ? 'white' : 'inherit' }} onClick={() => setSelected(5)}>
          <li>USUARIOS</li>
        </Link>
        <br />
        <Link to="/admin/flyers" className="link-without-styles" style={{ color: selected === 6 ? 'white' : 'inherit' }} onClick={() => setSelected(6)}>
          <li>BANNERS</li>
        </Link>
      </ul>
    </div>
  );
};

export default AdminNavBar;
