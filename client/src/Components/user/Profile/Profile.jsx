/* eslint-disable no-use-before-define */
/* eslint-disable no-nested-ternary */
/* eslint linebreak-style: ["error", "windows"] */
import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { FcBusinesswoman, FcBusinessman } from 'react-icons/fc';
import { GrUserManager } from 'react-icons/gr';
import EditProfile from './EditProfile';
import UserOrders from '../UserOrders/UserOrders';

const mockdata = {
  name: 'Diego Fernando',
  lastname: 'Vallejos Cifuentes',
  email: 'dfvallejosc@gmail.com',
  gender: 'Masculino',
  birthday: '02-28-1992',
  phone: 3152639144,
  adress: [{
    id: '1',
    name: 'Casa',
    adress: 'Calle 65 #56-84',
    description: 'Mi casa',
    region: 'Antioquia',
    postalCode: '10500',
  },
  {
    id: '2',
    name: 'Oficina',
    adress: 'Calle 56 #35-28',
    description: 'Mi oficina',
    region: 'Antioquia',
    postalCode: '10300',
  }],
};
export default function Profile() {
  // const user = useSelector((state) => state.user);
  const [edit, setEdit] = useState(false);
  const [menu, setMenu] = useState(1);

  return (
    <MainDiv className="bg-color-three">
      <Menu>
        <ItemMenu onClick={() => setMenu(1)} style={{ backgroundColor: `${menu === 1 ? '#CF988C' : 'white'}` }}>DETALLES</ItemMenu>
        <ItemMenu onClick={() => setMenu(2)} style={{ backgroundColor: `${menu === 2 ? '#CF988C' : 'white'}` }}>ÓRDENES DE COMPRA</ItemMenu>
        <ItemMenu onClick={() => setMenu(3)} style={{ backgroundColor: `${menu === 3 ? '#CF988C' : 'white'}` }}>MÉTODOS DE PAGO</ItemMenu>
        <ItemMenu onClick={() => setMenu(4)} style={{ backgroundColor: `${menu === 4 ? '#CF988C' : 'white'}` }}>CAMBIAR CONTRASEÑA</ItemMenu>
      </Menu>

      {menu === 1 ? !edit ? showProfile(setEdit)
        : <EditProfile user={mockdata} setEdit={setEdit} />
        : menu === 2 ? <UserOrders />
          : menu === 3 ? <h1>MÉTODOS DE PAGO</h1>
            : <h1>CAMBIAR CONTRASEÑA</h1>}
    </MainDiv>
  );
}

function showProfile(setEdit) {
  return (
    <DivContainer>
      <UserIcon>
        {mockdata.gender === 'Femenino'
          ? <FcBusinesswoman style={{ fontSize: '150px' }} />
          : mockdata.gender === 'Masculino' ? <FcBusinessman style={{ fontSize: '150px' }} />
            : <GrUserManager style={{ fontSize: '150px' }} />}
        <br />
        <span style={{ fontSize: '20px' }}>{`${mockdata.name}`}</span>
        <br />
        <span style={{ fontSize: '20px' }}>{`${mockdata.lastname}`}</span>
        <br />
        <br />
        <br />
        <EditButton onClick={() => setEdit(true)}>Editar</EditButton>
      </UserIcon>
      <UserInfo>
        <b>Email: </b>
        <br />
        <span>{mockdata.email}</span>
        <br />
        <br />
        <b>Teléfono de contacto: </b>
        <br />
        <span>{mockdata.phone || 'Sin teléfono agregado'}</span>
        <br />
        <br />
        <b>Fecha de nacimiento: </b>
        <br />
        <span>{mockdata.birthday || 'Sin fecha de nacimiento'}</span>
      </UserInfo>
      <UserInfo style={{ flexGrow: '6', overflowY: 'scroll' }}>
        <b>Direcciones de envío: </b>
        <br />
        <br />
        {mockdata.adress.length > 0
          ? mockdata.adress.map((a) => (
            <AdressDiv>
              <b>{a.name}</b>
              <br />
              <span>{a.adress}</span>
              <br />
              <span>{a.region}</span>
              <br />
              <span>{a.postalCode}</span>
              <br />
            </AdressDiv>
          ))
          : (
            <AdressDiv>
              <h4>No tienes direcciones agregadas</h4>
              <span>Agrega una dirección editando tu información</span>
            </AdressDiv>
          )}
      </UserInfo>
    </DivContainer>
  );
}

const MainDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 40px;
    height: 60vh;
    padding: 10px 30px;
    jusfity-content: center;
    text-align: center;
`;

const DivContainer = styled.div`
      display: flex;
      background-color: white;
      transform: translate(0px, -16px);
      height: 90%;
      justify-content: space-around;
      border-radius: 10px;
      padding: 20px 15px;
`;

const Menu = styled.ul`
    display: flex;
    list-style-type:none;
    text-align: left;
    width: 900px;
    font-weight: bold;
`;

const ItemMenu = styled.li`
    padding: 10px 35px;
    background-color: white;
    box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.2);
    &:hover {
      cursor: pointer;
      background-color: #CF988C;
    }
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

const EditButton = styled.button`
    font-size: 20px;
    padding: 5px 30px;
    border-style: none;
    background-color: #f0ddd8;

    &:hover{
      cursor: pointer;
    }
`;
