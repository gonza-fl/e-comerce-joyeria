/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
/* eslint-disable no-nested-ternary */
/* eslint linebreak-style: ["error", "windows"] */
import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { FcBusinesswoman, FcBusinessman } from 'react-icons/fc';
import { GrUserManager } from 'react-icons/gr';
import AddAdressModal from './AddAdressModal';

export default function EditProfile({ user, setEdit }) {
  // const user = useSelector((state) => state.user);
  const [addAdress, setAddAdress] = useState('none');
  const [input, setInput] = useState({
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    gender: user.gender,
    birthday: user.birthday,
    phone: user.phone,
    adresse: user.adresse,
  });

  function onChangeInput(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <DivContainer>
      <UserIcon>
        {user.gender === 'Femenino'
          ? <FcBusinesswoman style={{ fontSize: '150px' }} />
          : user.gender === 'Masculino' ? <FcBusinessman style={{ fontSize: '150px' }} />
            : <GrUserManager style={{ fontSize: '150px' }} />}
        <br />
        <span style={{ fontSize: '20px' }}>Nombre</span>
        <br />
        <input name="name" value={input.name} onChange={onChangeInput} />
        <br />
        <span style={{ fontSize: '20px' }}>Apellido</span>
        <br />
        <input name="lastname" value={input.lastname} onChange={onChangeInput} />
        <br />
        <br />
        <br />
        <AcceptButton onClick={() => setEdit(false)}>Aceptar</AcceptButton>
      </UserIcon>
      <UserInfo>
        <b>Email: </b>
        <br />
        <span>{user.email}</span>
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

        {input.adresse.length > 0
          ? input.adresse.map((a) => (
            <AdressDiv>
              <b>{a.name}</b>
              <br />
              <span>{a.adresse}</span>
              <br />
              <span>{a.region}</span>
              <br />
              <span>{a.postalCode}</span>
              <button type="button" style={{ transform: 'translate(220px, -40px)' }}>x</button>
            </AdressDiv>
          ))
          : (
            <AdressDiv>
              <h4>No tienes direcciones agregadas</h4>
              <span>Agrega una dirección editando tu información</span>
            </AdressDiv>
          )}
        <AcceptButton type="button" onClick={() => setAddAdress('inline')}>Agregar dirección</AcceptButton>
      </UserInfo>
      <AddAdressModal show={addAdress} setAddAdress={setAddAdress} />
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
