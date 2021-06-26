/* eslint-disable max-len */
/* eslint-disable react/jsx-first-prop-new-line */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable object-curly-newline */
/* eslint-disable object-property-newline */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import { URL_ORDERS_BY_ID } from '../../../../constants';
import './UserOrderDetail.css';

const UserOrderDetail = () => {
  const { orderId } = useParams();
  const [userOrderDetail, setUserOrderDetail] = useState({});

  useEffect(() => {
    axios.get(`${URL_ORDERS_BY_ID}${orderId}`)
      .then((response) => {
        setUserOrderDetail(response.data);
      })
      .catch((err) => swal('Error', err.response.data, 'warning'));
  }, []);

  if (!userOrderDetail.products || userOrderDetail.products.length === 0) {
    return (
      <div>
        <p>No hay detalles para mostrar</p>
      </div>
    );
  }
  const totalDetail = userOrderDetail.products.reduce((total, current) => total + current.orderline.subtotal, 0);

  return (
    <div className="user-order-detail-container">
      <div className="user-order-detail-products">
        <table className="user-order-detail-products-table">
          <tr>
            <th>Nombre</th>
            <th>Precio Unitario</th>
            <th>Cantidad</th>
            <th>Total</th>
            <th>Detalle</th>
            <th>Reviews</th>
          </tr>
          {userOrderDetail.products.map((product) => (
            <tr className="user-order-detail-products-rows">
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.orderline.amount}</td>
              <td>${product.orderline.subtotal}</td>
              <td>
                <Link className="user-order-detail-products-link"
                to={`/products/product/${product.orderline.productId}`}
                >Ver Producto
                </Link>
              </td>
              <td>
                <Link className="user-order-detail-products-link"
                  to={`/user/review/product/${product.orderline.productId}/${userOrderDetail.userId}`}
                >Review
                </Link>
              </td>
            </tr>
          ))}
        </table>
      </div>
      <div className="user-order-detail-data">
        <div className="user-order-detail-data-order">
          <p>N° de Orden: {userOrderDetail.orderNumber}</p>
          <p>Fecha: {userOrderDetail.endTimestamp}</p>
          <p>Estado: {userOrderDetail.status}</p>
          <p>Total: ${totalDetail}</p>
        </div>
        <div className="user-order-detail-data-user">
          <p>Nombre: {userOrderDetail.user.displayName}</p>
          <p>E-mail: {userOrderDetail.user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default UserOrderDetail;
