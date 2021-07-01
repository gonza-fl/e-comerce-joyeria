/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import swal from 'sweetalert';
import { URL_USERS } from '../../../constants';

function AddAdressModal({
  show, setAddAdress, userId, pivot, setPivot,
}) {
  const [input, setInput] = useState({
    name: '',
    address: '',
    postalCode: '',
    description: '',
  });

  function onChangeInput(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function addDirection(e) {
    e.preventDefault();

    if (!input.name) { return swal('Lo sentimos', 'Debes completar el espacio Nombre', 'warning'); }
    if (!input.address) { return swal('Lo sentimos', 'Debes completar el espacio Dirección', 'warning'); }
    if (!input.description) { return swal('Lo sentimos', 'Debes completar el espacio Descripción', 'warning'); }
    if (!input.postalCode) { return swal('Lo sentimos', 'Debes completar el espacio Código postal', 'warning'); }

    axios.post(`${URL_USERS}${userId}/address`, input)
      .then(() => swal('¡Muy bien!', 'La dirección se agregó con éxito', 'success'))
      .then(() => {
        document.getElementById('name').value = '';
        document.getElementById('address').value = '';
        document.getElementById('description').value = '';
        document.getElementById('postalCode').value = '';
        setInput({
          name: '',
          address: '',
          postalCode: '',
          description: '',
        });
        setAddAdress('none');
      })
      .then(() => setPivot(!pivot))
      .catch(() => swal('Lo sentimos', 'No se pugo agregar la dirección', 'warning'));
  }

  return (
    <BackgroundModal style={{ display: show }}>
      <ModalDiv className="bg-color-six">
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div style={{ textAlign: 'left' }}>
            <b className="editProfileb">Nombre</b>
            <br />
            <b className="editProfileb">Dirección</b>
            <br />
            <b className="editProfileb">Descripción</b>
            <br />
            <b className="editProfileb">Código postal</b>
          </div>
          <div>
            <input className="editProfileInput" id="name" name="name" onChange={onChangeInput} />
            <br />
            <input className="editProfileInput" id="address" name="address" onChange={onChangeInput} />
            <br />
            <input className="editProfileInput" id="description" name="description" onChange={onChangeInput} />
            <br />
            <input className="editProfileInput" id="postalCode" name="postalCode" onChange={onChangeInput} />
          </div>
        </div>
        <br />
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <AddButton
            type="button"
            className="bg-color-three"
            onClick={addDirection}
          >
            Agregar
          </AddButton>
          <AddButton
            type="button"
            className="bg-color-three"
            onClick={() => setAddAdress('none')}
          >
            Cancelar
          </AddButton>
        </div>
      </ModalDiv>
    </BackgroundModal>
  );
}

const BackgroundModal = styled.div`
        position: fixed; 
        z-index: 300; 
        width: 100%;
        height: 100%; 
        overflow: auto;
        transform: translate(0px,-230px);
        background-color: rgba(0,0,0,0.4); 
        left:0;
      
        @media (max-width:768px){
          width:100%:
           left:-35px;
        transform: translate(0px,-300px);

    }
    @media (max-width:452px){
      width:150%:

    }
`;

const ModalDiv = styled.form`
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    top: 40%;
    left: 40%;
    width:70%;
    
    padding: 20px 20px;
    border-radius: 10px;
    z-index: 300; 
    left:10%;
    top:20vh
    
    @media (max-width:768px){
      width:70%;
      left:10%;
      top:20vh
    }
    @media (max-width:452px){
      width:100%;
      left:0;
      top:30vh


    }
`;

const AddButton = styled.button`
    padding: 5px 10px;
    border-style: none;
    font-size: 15px;
    font-weight: bold;
    width:30%;
    margin-top:20px;

    &:hover {
        cursor: pointer;
    }
    @media (max-width:768px){
      width:30%;
      margin-top:20px
    }
`;

export default AddAdressModal;
