/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';
import './adminNavBar.css';

const AdminNavBar = () => (
  // <div className="container bg-color-three">
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
    {/* <Link to="/" className="link-without-styles"><div className="linkedDiv">VOLVER A INICIO</div></Link>
    <Link to="/admin/products" className="link-without-styles"><div className="linkedDiv">VER PRODUCTOS</div></Link>
    <Link to="/admin/controlcategories" className="link-without-styles"><div className="linkedDiv">CATEGORÍAS</div></Link>
    <Link to="/admin/statistics" className="link-without-styles"><div className="linkedDiv">VER ESTADÍSTICAS</div></Link>
    <Link to="/admin/orders" className="link-without-styles"><div className="linkedDiv">VER VENTAS</div></Link>
    <Link to="/admin/users" className="link-without-styles"><div className="linkedDiv">USUARIOS</div></Link> */}

  </div>
);

export default AdminNavBar;
