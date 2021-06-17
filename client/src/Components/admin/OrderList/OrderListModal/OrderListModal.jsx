/* eslint-disable react/prop-types */
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
      </tr>
      {userOrders.map((userOrder) => (
        <Link to="/admin/orderdetail">
          <tr className="table-data">
            <td>{userOrder.orderNumber}</td>
            <td>{userOrder.endTimestamp}</td>
            <td>{userOrder.total}</td>
            <td>{userOrder.status}</td>
          </tr>
        </Link>
      ))}
    </table>
  </div>

);

export default OrderListModal;
