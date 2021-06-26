/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import swal from 'sweetalert';
import { URL_USERS } from '../../../constants';

function AddAdressModal({
  show, setAddAdress, userId,
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
    axios.post(`${URL_USERS}${userId}/address`, input)
      .then(() => swal('¡Muy bien!', 'La dirección se agregó con éxito', 'success'))
      .catch(() => swal('Lo sentimos', 'No se pugo agregar la dirección', 'warning'));
    setAddAdress('none');
  }

  return (
    <BackgroundModal style={{ display: show }}>
      <ModalDiv className="bg-color-six">
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div style={{ textAlign: 'left' }}>
            <b>Nombre</b>
            <br />
            <b>Dirección</b>
            <br />
            <b>Descripción</b>
            <br />
            <b>Código postal</b>
          </div>
          <div>
            <input name="name" onChange={onChangeInput} />
            <br />
            <input name="address" onChange={onChangeInput} />
            <br />
            <input name="description" onChange={onChangeInput} />
            <br />
            <input name="postalCode" onChange={onChangeInput} />
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
        position: absolute; 
        z-index: 300; 
        width: 99vw;
        height: 99vh; 
        overflow: auto;
        transform: translate(0px,-230px);
        background-color: rgba(0,0,0,0.4); 
`;

const ModalDiv = styled.form`
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    top: 40%;
    left: 40%;
    width: 20%;
    padding: 20px 20px;
    border-radius: 10px;
    z-index: 300; 
`;

const AddButton = styled.button`
    padding: 5px 10px;
    border-style: none;
    font-size: 15px;
    font-weight: bold;

    &:hover {
        cursor: pointer;
    }
`;

export default AddAdressModal;
