/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FcBusinessman } from 'react-icons/fc';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import swal from 'sweetalert';
import EditProfile from './EditProfile';
import UserOrders from '../UserOrders/UserOrders';
import { getUserInfo } from '../../../redux/actions/actions';
import { URL_USERS } from '../../../constants';
import AddAdressModal from './AddAdressModal';
import EditPassword from './EditPassword/EditPassword';

export default function Profile() {
  const [edit, setEdit] = useState(false);
  const [menu, setMenu] = useState(1);
  const [addAdress, setAddAdress] = useState('none');
  const [pivot, setPivot] = useState(false);
  const logged = useSelector((state) => state.user);
  const user = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfo(logged.id));
  }, [edit, logged, pivot]);

  return (
    <MainDiv className="bg-color-three">
      <Menu>
        <ItemMenu onClick={() => setMenu(1)} style={{ backgroundColor: `${menu === 1 ? '#CF988C' : 'white'}` }}>DETALLES</ItemMenu>
        <ItemMenu onClick={() => setMenu(2)} style={{ backgroundColor: `${menu === 2 ? '#CF988C' : 'white'}` }}>ÓRDENES DE COMPRA</ItemMenu>
        <ItemMenu onClick={() => setMenu(3)} style={{ backgroundColor: `${menu === 3 ? '#CF988C' : 'white'}` }}>MÉTODOS DE PAGO</ItemMenu>
        <ItemMenu onClick={() => setMenu(4)} style={{ backgroundColor: `${menu === 4 ? '#CF988C' : 'white'}` }}>CAMBIAR CONTRASEÑA</ItemMenu>
      </Menu>

      {menu === 1 ? !edit ? showProfile(user, setEdit, addAdress, setAddAdress, pivot, setPivot)
        : <EditProfile user={user} setEdit={setEdit} />
        : menu === 2 ? <UserOrders id={user.id} />
          : menu === 3 ? <div><h1>MÉTODOS DE PAGO</h1></div>
            : <EditPassword />}
    </MainDiv>
  );
}

function showProfile(user, setEdit, addAdress, setAddAdress, pivot, setPivot) {
  function deleteDirection(addressId) {
    swal({
      title: '¿Estás seguro que deseas eliminar esta dirección?',
      text: '',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(`${URL_USERS}${user.id}/address/${addressId}`, { data: '' })
          .then(() => swal('¡Muy bien!', 'Eliminaste la dirección con éxito', 'success'))
          .then(() => setPivot(!pivot))
          .catch(() => swal('Lo sentimos', 'Hubo un problema al eliminar la dirección', 'warning'));
      } else {
        swal('¡La dirección no fue eliminada!');
      }
    });
  }
  return (
    <DivContainer>
      <UserIcon>
        <FcBusinessman style={{ fontSize: '150px' }} />
        <br />
        <span style={{ fontSize: '20px' }}>{`${user.name}`}</span>
        <br />
        <br />
        <br />
        <EditButton onClick={() => setEdit(true)}>Editar</EditButton>
      </UserIcon>
      <UserInfo>
        <b>Email: </b>
        <br />
        <span>{user.email}</span>
        <br />
        <br />
        <b>Teléfono de contacto: </b>
        <br />
        <span>{user.phone || 'Sin teléfono agregado'}</span>
        <br />
        <br />
        <b>Fecha de nacimiento: </b>
        <br />
        <span>{user.birthday || 'Sin fecha de nacimiento'}</span>
      </UserInfo>
      <div style={{
        display: 'flex', flexDirection: 'column', flexGrow: '6', width: '50%', alignItems: 'center', padding: '5px 0px',
      }}
      >
        <UserInfo style={{ overflowY: 'scroll', width: '80%' }}>
          <b>Direcciones de envío: </b>

          {user.addresses && user.addresses.length > 0
            ? user.addresses.map((a) => (
              <AdressDiv>
                <b>{a.description}</b>
                <br />
                <span>{a.address}</span>
                <br />
                <span>{a.city}</span>
                <br />
                <span>{a.state}</span>
                <button type="button" style={{ transform: 'translate(220px, -40px)' }} onClick={() => deleteDirection(a.id)}>x</button>
              </AdressDiv>
            ))
            : (
              <AdressDiv>
                <h4>No tienes direcciones agregadas</h4>
                <span>Agrega una dirección</span>
              </AdressDiv>
            )}
        </UserInfo>
        <div className="bg-color-six" style={{ width: '90%' }}>
          <AcceptButton type="button" onClick={() => setAddAdress('inline')}>Agregar dirección</AcceptButton>
        </div>
      </div>
      <AddAdressModal show={addAdress} setAddAdress={setAddAdress} userId={user.id} pivot={pivot} setPivot={setPivot} />
    </DivContainer>
  );
}

const MainDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 40px;
    height: 60%;
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

const AcceptButton = styled.button`
    font-size: 18px;
    padding: 5px 30px;
    border-style: none;
    background-color: #f0ddd8;
    float: bottom;
    width: 60%;
    align-self: center;

    &:hover{
      cursor: pointer;
    }
`;
