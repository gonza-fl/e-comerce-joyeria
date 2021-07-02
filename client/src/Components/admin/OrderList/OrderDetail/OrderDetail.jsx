/* eslint-disable max-len */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable object-curly-newline */
/* eslint-disable object-property-newline */
/* eslint-disable no-unused-vars */
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
        <p>N° de Orden: {orderDetail.orderNumber}</p>
        <p>Fecha: {orderDetail.endTimestamp}</p>
        <p>Total: ${totalDetail}</p>
        <p>Estado: {orderDetail.status}</p>
      </div>
      <div className="user-data-info">
        <div className="user-data-info-detail">
          <p>Nombre: {orderDetail.user.displayName}</p>
          <p>E-mail: {orderDetail.user.email}</p>
          <p>Género: {orderDetail.user.genre}</p>
          <p>Cumpleaños: {orderDetail.user.birthday}</p>
          <p>Teléfono: {orderDetail.user.phone}</p>
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
