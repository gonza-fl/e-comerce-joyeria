import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../StyledComponents/Button';
import ModalCreatProductos from '../CreateProduct/modalCreateProducts/ModalCreateProducts';


function AdminWindow(props) {
    return (
        <div>
            <h1>ADMINISTRADOR</h1>
            <ModalCreatProductos/>
            <Link to='/admin/addCategory'><Button text={'Agregar una categoría'} style={{marginTop: '20px'}}/></Link>
                  {/* <Link to="/createProduct"> <div style={{
        "background-color": "red",
      }}>
        <p>PROBANDO LINK</p>

      </div></Link> */}
        </div>
    );
}

export default AdminWindow;