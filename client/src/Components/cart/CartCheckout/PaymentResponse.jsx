/* eslint-disable max-len */
import axios from 'axios';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { URL_ORDERS_BY_ID } from '../../../constants';
import './PaymentResponse.css';

function PaymentResponse() {
  const location = useLocation().search;
  const paymentStatus = location.split('&').map((item) => item.split('=')).find((item) => item.includes('lapTransactionState'))[1];
  const orderID = location.split('&').map((item) => item.split('=')).find((item) => item.includes('referenceCode'))[1].split('-')[1];

  useEffect(() => {
    axios.post(`${URL_ORDERS_BY_ID}${orderID}`, { status: `${paymentStatus === 'APPROVED' ? 'paidPendingDispatch' : 'cart'}` }, { headers: { 'access-token': 'Prisijom4lZZdX2Xo5rRV3zX1GH2' } })
      .then((res) => console.log(res))
      .catch((err) => console.log(err.response.data));
  }, []);
  //   const query = new URLSearchParams(location.search);

  //   function getValue(param) {
  //     return location.split('&').map((item) => item.split('=')).find((item) => item.includes(param)[1]);
  //   }
  return (
    <div>
      <div className="main-container-PR bg-color-six">
        <h2>
          Transacción:
          {' '}
          {paymentStatus === 'APPROVED' ? 'APROBADA'
            : 'RECHAZADA'}
        </h2>
        <b>Código de transacción: </b>
        <span>{location.split('&').map((item) => item.split('=')).find((item) => item.includes('transactionId'))[1]}</span>
        <br />
        <b>Método de pago: </b>
        <span>
          {location.split('&').map((item) => item.split('=')).find((item) => item.includes('lapPaymentMethodType'))[1] === 'CREDIT_CARD'
            ? 'TARJETA DE CRÉDITO' : 'OTRO'}

        </span>
        <br />
        <b>Valor: </b>
        <span>{location.split('&').map((item) => item.split('=')).find((item) => item.includes('TX_VALUE'))[1]}</span>
        <br />
        <b>Fecha: </b>
        <span>{location.split('&').map((item) => item.split('=')).find((item) => item.includes('processingDate'))[1]}</span>

      </div>
      <button type="button" className="back-button-PR bg-color-three"><a href="/" className="link-without-styles">REGRESAR A COMPRAR</a></button>
    </div>
  );
}

export default PaymentResponse;
