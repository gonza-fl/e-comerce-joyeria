/* eslint linebreak-style: ["error", "windows"] */
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const AdminNavBar = () => (
  <DivContainer className="bg-color-three">
    <ul style={{ listStyle: 'none', textAlign: 'left' }}>
      <Link to="/admin/products" className="link-without-styles"><li>VER PRODUCTOS</li></Link>
      <br />
      <Link to="/admin/controlcategories" className="link-without-styles"><li>CATEGORÍAS</li></Link>
      <br />
      <Link to="/admin/statistics" className="link-without-styles"><li>VER ESTADÍSTICAS</li></Link>
      <br />
      <Link to="/admin/orders" className="link-without-styles"><li>VER VENTAS</li></Link>
    </ul>
  </DivContainer>
);

const DivContainer = styled.div`
        padding: 10px 10px;
        flex-grow: 1;
        height: 95%;
        font-weight: bold;
`;

export default AdminNavBar;
