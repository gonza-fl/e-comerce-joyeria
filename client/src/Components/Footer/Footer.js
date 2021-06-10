import React from 'react';
import styled from 'styled-components';
import { FaInstagram, FaWhatsapp, FaCcVisa, FaCcMastercard } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';

export function Footer() {
  return (
    <StyledDiv className={'bg-color-six font-color-seven'}>
      <div style={{flexGrow: '1'}}>
        <h3>Contáctanos</h3>

        <StyledAnchor href='https://www.instagram.com/k.mora_accesorios/' target="_blank">
          <FaInstagram/>
        </StyledAnchor>
        <span>&ensp; Instagram</span><br/>

        <StyledAnchor href='https://api.whatsapp.com/send?phone=57321 6417226' target="_blank">
          <FaWhatsapp/>
        </StyledAnchor>
        <span>&ensp; Whatsapp</span><br/>

        <StyledAnchor>
          <HiOutlineMail/>
        </StyledAnchor>
        <span>&ensp; E-mail</span><br/>
      </div>

      <div style={{flexGrow: '1'}}>
        <h3>Acerca de nosotros</h3>
        
        <span>Términos y condiciones</span><br/>
        <span>Políticas de privacidad</span><br/>
        <span>Políticas de datos</span><br/>
        <span>Plazos y costos de envío</span><br/>

      </div>

      <div style={{flexGrow: '1'}}>
        <h3>Medios de pago</h3>
        <FaCcVisa style={{fontSize: '30px'}}/><br/>
        <FaCcMastercard style={{fontSize: '30px'}}/>
      </div>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
        display: flex;
        width: 100%;
        height: 200px;
        justify-content: center;
        margin-top: 30px;
`

const StyledAnchor = styled.a`
        font-size: 150%;
        text-decoration: inherit;
        color: inherit;
`