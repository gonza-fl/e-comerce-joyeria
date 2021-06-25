/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../../StyledComponents/Button';
import AdminCreateProduct from '../../AdminProducts/AdminCreateProduct';
import { getCategories } from '../../../../redux/actions/actions';
import './modalcreateProducts.css';

// TESTEAR QUE ONDA CON EL ONCLICK DE BUTTON Y SPAN
// SE LE QUITó const modal = document.getElementById('myModal') de adentro del onclick

export default function ModalCreatProductos() {
  const dispatch = useDispatch();
  const [modal, setModal] = useState('none');

  useEffect(() => {
    dispatch(getCategories());
  }, [modal]);

  return (
    <div style={{ marginTop: '20px' }}>
      <Button id="myBtn" handleClick={() => setModal('block')} text="Agregar nuevo producto" />
      <div id="myModal" className="modal">
        <div className="modal-content">
          <AdminCreateProduct setModal={setModal} modal={modal} />
        </div>
      </div>
    </div>
  );
}
