import React from 'react';
import { Link } from 'react-router-dom';
import './adminNavBar.css';

const AdminNavBar = () => (
  <div className="container">

    <Link to="/" className="link-without-styles"><div>VOLVER A INICIO</div></Link>
    <Link to="/admin/products" className="link-without-styles"><div>VER PRODUCTOS</div></Link>
    <Link to="/admin/controlcategories" className="link-without-styles"><div>CATEGORÍAS</div></Link>
    <Link to="/admin/statistics" className="link-without-styles"><div>VER ESTADÍSTICAS</div></Link>
    <Link to="/admin/orders" className="link-without-styles"><div>VER VENTAS</div></Link>
    <Link to="/admin/users" className="link-without-styles"><div>USUARIOS</div></Link>

  </div>
);

export default AdminNavBar;
