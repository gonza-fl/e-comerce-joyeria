/* eslint-disable react/prop-types */
/* eslint linebreak-style: ["error", "windows"] */
import React from 'react';
import { Link } from 'react-router-dom';
import './OrderListModal.css';

const OrderListModal = ({ userOrders }) => {
  const handleChange = function (e) {
    e.preventDefault();
    // enviarle el put necesario a la api para cambiar el valor en el back
    // axios.put(API_URL/order?status=e.target.value)
  };

  return (
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
            <td>
              <select onChange={(e) => { handleChange(e); }}>
                <option value={userOrder.status}>{userOrder.status}</option>
                <option value="esperando entrega"> esperando entrega </option>
                <option value="finalizada">finalizado</option>
                <option value="carrito "> carrito </option>
              </select>
            </td>
            <td>
              <Link className="table-detail" to="/admin/orders/:orderId">Ver Detalle</Link>
            </td>
          </tr>
        ))}
      </table>
    </div>

  );
};

export default OrderListModal;
