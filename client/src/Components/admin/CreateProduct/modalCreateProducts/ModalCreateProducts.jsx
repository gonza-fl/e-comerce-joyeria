/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */

import React from 'react';
import CreateProduct from '../CreateProduct';
import './modalcreateProducts.css';

// TESTEAR QUE ONDA CON EL ONCLICK DE BUTTON Y SPAN
// SE LE QUITó const modal = document.getElementById('myModal') de adentro del onclick

export default function ModalCreatProductos() {
  const modal = document.getElementById('myModal');
  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };
  return (
    <div>
      <button id="myBtn" onClick={() => { const modal = document.getElementById('myModal'); modal.style.display = 'block'; }}>Agregar nuevo producto</button>
      <div id="myModal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => { const modal = document.getElementById('myModal'); modal.style.display = 'none'; }}>X</span>
          <CreateProduct />
        </div>
      </div>
    </div>
  );
}
