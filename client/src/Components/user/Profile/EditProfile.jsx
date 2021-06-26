/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import styled from 'styled-components';
import { FcBusinessman } from 'react-icons/fc';
import axios from 'axios';
import swal from 'sweetalert';
import { URL_USERS } from '../../../constants';

export default function EditProfile({
  user, setEdit,
}) {
  const [input, setInput] = useState({
    name: user.name,
    email: user.email,
    birthday: user.birthday,
    phone: user.phone,
    addresses: user.addresses,
  });

  function onChangeInput(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function onSubmitChanges() {
    axios.put(`${URL_USERS}${user.id}`, {
      displayName: input.name,
      birthday: input.birthday,
      phone: input.phone,
    })
      .then(() => swal('¡Muy bien!', 'Los datos se actualizaron correctamente', 'success'))
      .then(() => setEdit(false))
      .catch(() => swal('Lo sentimos', 'No se puso actualizar la información', 'warning'));

    // axios.put(`${URL_USERS}${user.id}/address`, {})
  }

  return (
    <DivContainer>
      <UserIcon>
        <FcBusinessman style={{ fontSize: '150px' }} />
        <br />
        <span style={{ fontSize: '20px' }}>Nombre completo</span>
        <br />
        <input name="name" value={input.name} onChange={onChangeInput} />
        <br />
        <br />
        <br />
        <br />
        <AcceptButton type="button" onClick={onSubmitChanges}>Aceptar</AcceptButton>
        <br />
        <br />
        <AcceptButton type="button" onClick={() => setEdit(false)}>Cancelar</AcceptButton>
      </UserIcon>
      <UserInfo>
        <b>Email: </b>
        <br />
        <span>{input.email}</span>
        <br />
        <br />
        <b>Teléfono de contacto: </b>
        <br />
        <input name="phone" value={input.phone} onChange={onChangeInput} />
        <br />
        <br />
        <b>Fecha de nacimiento: </b>
        <br />
        <input name="birthday" value={input.birthday} />
      </UserInfo>
      <UserInfo style={{
        flexGrow: '6', display: 'flex', flexDirection: 'column', overflowY: 'scroll',
      }}
      >
        <b>Direcciones de envío: </b>

        {input.addresses.length > 0
          ? input.addresses.map((a) => (
            <AdressDiv>
              <b>{a.description}</b>
              <br />
              <span>{a.address}</span>
              <br />
              <span>{a.name}</span>
              <br />
              <span>{a.postalCode}</span>
            </AdressDiv>
          ))
          : (
            <AdressDiv>
              <h4>No tienes direcciones agregadas</h4>
              <span>Agrega una dirección</span>
            </AdressDiv>
          )}
      </UserInfo>
    </DivContainer>
  );
}

const DivContainer = styled.form`
      display: flex;
      background-color: white;
      transform: translate(0px, -16px);
      height: 90%;
      justify-content: space-around;
      border-radius: 10px;
      padding: 20px 15px;
`;

const UserInfo = styled.div`
    text-align: left;
    padding: 20px 30px;
    margin-left: 20px;
    font-size: 18px;
    background-color: #f1eee3;
    flex-grow: 3;
`;

const UserIcon = styled.div`
    background-color: #f1eee3;
    padding: 10px 20px;
    flex-grow: 2;
`;

const AdressDiv = styled.div`
    padding: 10px 0px;
`;

const AcceptButton = styled.button`
    font-size: 18px;
    padding: 5px 30px;
    border-style: none;
    background-color: #f0ddd8;

    &:hover{
      cursor: pointer;
    }
`;
