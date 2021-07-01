/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import swal from 'sweetalert';
import { URL_USERS } from '../../../constants';
import { getStates } from './utils/directions';
import './AddAdressModal.css';

function AddAdressModal({
  show, setAddAdress, userId, pivot, setPivot,
}) {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [input, setInput] = useState({
    description: '',
    address: '',
    state: '',
    city: '',
  });

  function onChangeInput(e) {
    if (e.target.name === 'state' && e.target.value === '1') {
      setCities([]);
    }
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    setStates(getStates());
  }, []);

  useEffect(() => {
    axios.get(`https://www.datos.gov.co/resource/xdk5-pm3f.json?departamento=${input.state}`,
      { data: { $limit: 5000, $$app_token: 'f44im5lls147xsi9og61tih5i' } })
      .then((res) => setCities(res.data.map((d) => d.municipio)));
  }, [input.state]);

  function addDirection(e) {
    e.preventDefault();

    if (!input.description) { return swal('Lo sentimos', 'Debes completar el espacio Descripción', 'warning'); }
    if (!input.address) { return swal('Lo sentimos', 'Debes completar el espacio Dirección', 'warning'); }
    if (!input.state) { return swal('Lo sentimos', 'Debes seleccionar un departamento', 'warning'); }
    if (!input.city) { return swal('Lo sentimos', 'Debes seleccionar una ciudad', 'warning'); }

    axios.post(`${URL_USERS}${userId}/address`, input)
      .then(() => swal('¡Muy bien!', 'La dirección se agregó con éxito', 'success'))
      .then(() => {
        document.getElementById('description').value = '';
        document.getElementById('address').value = '';
        document.getElementById('city').value = '';
        document.getElementById('state').value = '';
        setInput({
          address: '',
          city: '',
          state: '',
          description: '',
        });
        setAddAdress('none');
      })
      .then(() => setPivot(!pivot))
      .catch((err) => swal('Lo sentimos', 'No se pugo agregar la dirección', 'warning'));
  }

  return (
    <BackgroundModal style={{ display: show }}>
      <ModalDiv className="bg-color-six">
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
            <b>Descripción</b>
            <input id="description" name="description" onChange={onChangeInput} className="input-styles" />
            <b>Dirección</b>
            <input id="address" name="address" onChange={onChangeInput} className="input-styles" />
            <b>Departamento</b>
            <select id="state" name="state" className="select-state-am" onChange={onChangeInput}>
              <option name="city" value="1">Selecciona tu departamento</option>
              {states.map((s) => <option name="state" value={s}>{s}</option>)}
            </select>
            <b>Ciudad</b>
            <select id="city" name="city" className="select-state-am" onChange={onChangeInput}>
              <option name="city" value="1">Selecciona tu cuidad</option>
              {cities.map((c) => <option name="city" value={c}>{c}</option>)}
            </select>
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
        transform: translate(0px,-130px);
        background-color: rgba(0,0,0,0.4); 
`;

const ModalDiv = styled.form`
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    top: 35%;
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
