/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../../StyledComponents/Button';
import CreateProduct from '../CreateProduct';
import { getCategories } from '../../../../redux/actions/actions';
import './modalcreateProducts.css';

// TESTEAR QUE ONDA CON EL ONCLICK DE BUTTON Y SPAN
// SE LE QUITó const modal = document.getElementById('myModal') de adentro del onclick

export default function ModalCreatProductos() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  const modal = document.getElementById('myModal');
  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };
  return (
    <div>
      <Button id="myBtn" handleClick={() => { const modal = document.getElementById('myModal'); modal.style.display = 'block'; }} text="Agregar nuevo producto" />
      <div id="myModal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => { const modal = document.getElementById('myModal'); modal.style.display = 'none'; }}>X</span>
          <CreateProduct />
        </div>
      </div>
    </div>
  );
}
