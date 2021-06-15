/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
import React from 'react';
import ModifyProduct from '../ModifyProduct';
import './modalModifyProduct.css';

export default function ModalModifyProduct(props) {
  const modal = document.getElementById('myModal');
  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };
  return (
    <div>
      <button id="myBtn" onClick={() => { const modal = document.getElementById('myModal'); modal.style.display = 'block'; }}>Modificar producto</button>
      <div id="myModal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => { const modal = document.getElementById('myModal'); modal.style.display = 'none'; }}>X</span>
          <ModifyProduct id={props.id} />
        </div>
      </div>
    </div>
  );
}
