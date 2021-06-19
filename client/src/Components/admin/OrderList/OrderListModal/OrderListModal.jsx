/* eslint-disable max-len */
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
        <div className="modal-filter-container">
          <span className="modal-filter-title">Filtrar por estado de orden</span>
          <select onChange={(e) => handleFilter(e)}>
            <option value="">Todas las ordenes</option>
            <option value="Carrito">Carrito</option>
            <option value="Esperando entrega">Esperando entrega</option>
            <option value="Finalizada">Finalizada</option>
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
                  <option value="Esperando entrega"> Esperando entrega </option>
                  <option value="Finalizada">Finalizada</option>
                  <option value="Carrito "> Carrito </option>
                </select>
              </td>
              <td>
                <Link className="table-detail" to={`/admin/orders/${userOrder.id}`}>Ver Detalle</Link>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default OrderListModal;
