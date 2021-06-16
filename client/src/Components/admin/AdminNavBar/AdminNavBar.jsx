import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const AdminNavBar = () => (
  <DivContainer className="bg-color-three">
    <ul style={{ listStyle: 'none', textAlign: 'left' }}>
      <Link to="/admin/products" className="link-without-styles"><li>VER PRODUCTOS</li></Link>
      <br />
      <Link to="/admin/createproduct" className="link-without-styles"><li>CREAR PRODUCTO</li></Link>
      <br />
      <Link to="/admin/addcategory" className="link-without-styles"><li>AGREGAR CATEGORÍA</li></Link>
      <br />
      <Link to="/admin/statistics" className="link-without-styles"><li>VER ESTADÍSTICAS</li></Link>
    </ul>
  </DivContainer>
);

const DivContainer = styled.div`
        padding: 10px 10px;
        flex-grow: 1;
        height: 100%;
        font-weight: bold;
`;

export default AdminNavBar;
