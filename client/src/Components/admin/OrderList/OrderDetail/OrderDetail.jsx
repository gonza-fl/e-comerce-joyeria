/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import { URL_ORDERS_BY_ID } from '../../../../constants';
import './OrderDetail.css';

const OrderDetail = () => {
  const { orderId } = useParams();
  const [orderDetail, setOrderDetail] = useState({});

  useEffect(() => {
    axios.get(`${URL_ORDERS_BY_ID}${orderId}`)
      .then((response) => {
        setOrderDetail(response.data);
      })
      .catch((err) => swal('Error', err.response.data, 'warning'));
  }, []);

  if (!orderDetail.products || orderDetail.products.length === 0) {
    return (
      <div>
        <p>No hay detalles para mostrar</p>
      </div>
    );
  }
  const totalDetail = orderDetail.products.reduce((total, current) => total + current.orderline.subtotal, 0);

  return (
    <div className="detail-container">
      <div className="order-data">
        <p><b>N° de Orden:</b> {orderDetail.orderNumber}</p>
        <p><b>Fecha:</b> {orderDetail.endTimestamp.substr(0, 10)}</p>
        <p><b>Total:</b> ${totalDetail}</p>
        <p><b>Estado:</b> {' '}
          {orderDetail.status === 'paidPendingDispatch'
            ? 'Pagado, entrega pendiente'
            : orderDetail.status === 'deliveryInProgress' ? 'Entrega en camino'
              : orderDetail.status === 'finished' ? 'finalizada' : 'cancelada'}
        </p>
      </div>
      <div className="user-data-info">
        <div className="user-data-info-detail">
          <p><b>Dirección:</b> {orderDetail.user.addresses[0].address}</p>
          <p><b>Ciudad:</b> {orderDetail.user.addresses[0].city}</p>
          <p><b>Región:</b> {orderDetail.user.addresses[0].state}</p>
          <p><b>Descripción:</b> {orderDetail.user.addresses[0].description}</p>
          <p><b>E-mail del comprador:</b> {orderDetail.user.email}</p>
        </div>
      </div>
      <div className="products-data-info">
        <table className="product-data-info-table">
          <tr>
            <th>Nombre</th>
            <th>Precio Unitario</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
          </tr>
          {orderDetail.products.map((product) => (
            <tr>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.orderline.amount}</td>
              <td>${product.orderline.subtotal}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default OrderDetail;
