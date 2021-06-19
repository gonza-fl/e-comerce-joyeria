/* eslint-disable react/prop-types */
/* eslint linebreak-style: ["error", "windows"] */
import React from 'react';
import { Link } from 'react-router-dom';
import './OrderListModal.css';

const OrderListModal = ({ userOrders }) => (
  <div className="modal-container">
    <table className="modal-table">
      <tr>
        <th>N° ORDEN</th>
        <th>FECHA</th>
        <th>TOTAL</th>
        <th>ESTADO</th>
        <th>DETALLE</th>
      </tr>
      {userOrders.map((userOrder) => (
        <tr className="table-data">
          <td>{userOrder.orderNumber}</td>
          <td>{userOrder.endTimestamp}</td>
          <td>{userOrder.total}</td>
          <td>{userOrder.status}</td>
          <td>
            <Link className="table-detail" to={`/admin/orders/${userOrder.id}`}>Ver Detalle</Link>
          </td>
        </tr>
      ))}
    </table>
  </div>

);

export default OrderListModal;
