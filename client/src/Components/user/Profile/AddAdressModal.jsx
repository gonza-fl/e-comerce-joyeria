/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

function AddAdressModal({ show, setAddAdress }) {
  return (
    <BackgroundModal style={{ display: show }}>
      <ModalDiv className="bg-color-six">
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div style={{ textAlign: 'left' }}>
            <b>Nombre</b>
            <br />
            <b>Dirección</b>
            <br />
            <b>Región</b>
            <br />
            <b>Código postal</b>
          </div>
          <div>
            <input name="name" />
            <br />
            <input name="adress" />
            <br />
            <input name="region" />
            <br />
            <input name="postalCode" />
          </div>
        </div>
        <br />
        <AddButton
          type="button"
          className="bg-color-three"
          onClick={() => setAddAdress('none')}
        >
          Agregar

        </AddButton>
      </ModalDiv>
    </BackgroundModal>
  );
}

const BackgroundModal = styled.div`
        position: absolute; 
        z-index: 10; 
        width: 99vw;
        height: 99vh; 
        overflow: auto;
        transform: translate(0px,-230px);
        background-color: rgba(0,0,0,0.4); 
`;

const ModalDiv = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    top: 40%;
    left: 40%;
    width: 20%;
    padding: 20px 20px;
`;

const AddButton = styled.button`
    padding: 5px 0px;
    border-style: none;
    font-size: 15px;
    font-weight: bold;

    &:hover {
        cursor: pointer;
    }
`;

export default AddAdressModal;
