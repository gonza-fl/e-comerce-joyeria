import React from 'react';
import { Link } from 'react-router-dom';
import './adminNavBar.css';

const AdminNavBar = () => (
  <div className="container">

    <Link to="/" className="link-without-styles"><div className="linkedDiv">VOLVER A INICIO</div></Link>
    <Link to="/admin/products" className="link-without-styles"><div className="linkedDiv">VER PRODUCTOS</div></Link>
    <Link to="/admin/controlcategories" className="link-without-styles"><div className="linkedDiv">CATEGORÍAS</div></Link>
    <Link to="/admin/statistics" className="link-without-styles"><div className="linkedDiv">VER ESTADÍSTICAS</div></Link>
    <Link to="/admin/orders" className="link-without-styles"><div className="linkedDiv">VER VENTAS</div></Link>
    <Link to="/admin/users" className="link-without-styles"><div className="linkedDiv">USUARIOS</div></Link>

  </div>
);

export default AdminNavBar;
