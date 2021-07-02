/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';
import './adminNavBar.css';

const AdminNavBar = () => (
  <div className="container">
    <ul style={{ listStyle: 'none', textAlign: 'left' }}>
      <Link to="/" className="link-without-styles"><li>VOLVER A INICIO</li></Link>
      <br />
      <Link to="/admin/products" className="link-without-styles"><li>PRODUCTOS</li></Link>
      <br />
      <Link to="/admin/controlcategories" className="link-without-styles"><li>CATEGORÍAS</li></Link>
      <br />
      <Link to="/admin/statistics" className="link-without-styles"><li>ESTADÍSTICAS</li></Link>
      <br />
      <Link to="/admin/orders" className="link-without-styles"><li>VENTAS</li></Link>
      <br />
      <Link to="/admin/users" className="link-without-styles"><li>USUARIOS</li></Link>
      <br />
      <Link to="/admin/flyers" className="link-without-styles"><li>BANNERS</li></Link>
    </ul>
  </div>
);
export default AdminNavBar;
