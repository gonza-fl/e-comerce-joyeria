/* eslint-disable react/prop-types */
/* eslint linebreak-style: ["error", "windows"] */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './OrderListModal.css';

const OrderListModal = ({ userOrders }) => {
  // eslint-disable-next-line func-names
  const [ordenes, setOrdenes] = useState(userOrders);
  const [orders, setOrders] = useState(ordenes);
  useEffect(() => {
    setOrdenes(userOrders);
  }, [orders]);
  function handleFilter(e) {
    e.preventDefault();
    if (e.target.value.length > 1) {
      setOrders(ordenes.filter((o) => o.status === e.target.value));
    } else { setOrders(userOrders); }
  }
  function handleChange(e) {
    e.preventDefault();
    // enviarle el put necesario a la api para cambiar el valor en el back
    // axios.put(API_URL/order?status=e.target.value)
  }

  return (
    <div className="modal-container">
      <div>
        <div>
          <span>filtrar por estado de orden</span>
          <select onChange={(e) => handleFilter(e)}>
            <option value="">todas las ordenes</option>
            <option value="carrito">carrito</option>
            <option value="esperando entrega">esperando entrega</option>
            <option value="finalizada">finalizada</option>
          </select>
        </div>
        <table className="modal-table">
          <tr>
            <th>N° ORDEN</th>
            <th>FECHA</th>
            <th>TOTAL</th>
            <th>ESTADO</th>
            <th>DETALLE</th>
          </tr>
          {orders.map((userOrder) => (
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
    </div>

  );
};

export default OrderListModal;
