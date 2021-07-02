/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { URL_ORDERS_BY_ID } from '../../../../constants';
import { getUserOrders } from '../../../../redux/actions/actions';
import './OrderListModal.css';

const OrderListModal = ({ id }) => {
  // eslint-disable-next-line func-names
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.userOrders);
  const [filter, setFilter] = useState([]);
  const user = useSelector((state) => state.user);
  // eslint-disable-next-line consistent-return
  function handleOrderStatus(oS) {
    switch (oS) {
      case 'cart': return 'carrito';
      case 'paidPendingDispatch': return 'pagado, esperando envio';
      case 'deliveryInProgress': return 'en proceso de envio';
      case 'finished': return 'finalizada';
      case 'canceled': return 'cancelada';
      default: return 'cart';
    }
  }

  useEffect(() => {
    dispatch(getUserOrders(id));
  }, []);

  useEffect(() => {
    setFilter(orders);
  }, [orders]);

  function handleFilter(e) {
    e.preventDefault();
    if (e.target.value === 'Todas') {
      setFilter(orders);
    } else {
      setFilter(orders.filter((f) => f.status === e.target.value));
    }
  }
  function handleChange(e, orderId) {
    e.preventDefault();
    if (e.target.value) {
      axios.put(`${URL_ORDERS_BY_ID}${orderId}`, {
        status: e.target.value,
      }, {
        headers: {
          'access-token': user.id,
        },
      })
        .then(() => swal('Bien', 'Estado modificado con éxito', 'success'))
        .then(() => { window.location.href = `${window.location.origin}/admin/orders`; })
        .catch(() => swal('Alerta!', 'No se pudo actualizar el estado', 'warning'));
    }
  }
  if (orders.length < 2) {
    return (
      <div className="modal-container">
        <h1>El usuario no tiene historial de órdenes de compra</h1>
      </div>
    );
  }
  return (
    <div className="modal-container">
      <div>
        <div className="modal-filter-container">
          <span className="modal-filter-title">Filtrar por estado de orden</span>
          <select onChange={handleFilter}>
            <option value="Todas">Todas las ordenes</option>
            <option value="cart">Carrito</option>
            <option value="paidPendingDispatch">pagadas, esperando envio</option>
            <option value="deliveryInProgress">En proceso de envio</option>
            <option value="finished">Finalizada</option>
            <option value="canceled">Cancelada</option>
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
          {filter.map((userOrder) => userOrder.status !== 'cart' && (
            <tr className="table-data" key={userOrder.orderNumber}>
              <td>{userOrder.orderNumber}</td>
              <td>{userOrder.endTimestamp.substr(0, 10)}</td>
              <td>{userOrder.total}</td>
              <td>
                <span>{handleOrderStatus(userOrder.status)}</span>
                <br />
                {userOrder.status === 'cart' ? null
                  : (
                    <select onChange={(e) => { handleChange(e, userOrder.id); }}>
                      <option value=""> Modificar estado </option>
                      <option value="paidPendingDispatch" style={{ display: `${['cart', 'deliveryInProgress', 'finished', 'canceled'].includes(userOrder.status) ? 'inline' : 'none'}` }}>Pagada, esperando entrega </option>
                      <option value="deliveryInProgress" style={{ display: `${['cart', 'paidPendingDispatch', 'finished', 'canceled'].includes(userOrder.status) ? 'inline' : 'none'}` }}> En proceso de envio </option>
                      <option value="finished" style={{ display: `${['cart', 'paidPendingDispatch', 'deliveryInProgress', 'canceled'].includes(userOrder.status) ? 'inline' : 'none'}` }}>Orden Finalizada</option>
                      <option value="canceled" style={{ display: `${['cart', 'paidPendingDispatch', 'deliveryInProgress', 'finished'].includes(userOrder.status) ? 'inline' : 'none'}` }}>Cancelada</option>
                    </select>
                  )}
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
