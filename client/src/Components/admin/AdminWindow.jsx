/* eslint linebreak-style: ["error", "windows"] */
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../StyledComponents/Button';
import ModalCreatProductos from './CreateProduct/modalCreateProducts/ModalCreateProducts';

function AdminWindow() {
  return (
    <div>
      <h1>ADMINISTRADOR</h1>
      <ModalCreatProductos />
      <Link to="/admin/addCategory">
        <Button text="Agregar una categoría" style={{ marginTop: '20px' }} />
      </Link>
    </div>
  );
}

export default AdminWindow;
