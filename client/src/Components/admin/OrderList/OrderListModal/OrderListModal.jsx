/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserOrders } from '../../../../redux/actions/actions';
import './OrderListModal.css';

const OrderListModal = ({ id }) => {
  // eslint-disable-next-line func-names
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.userOrders);
  const [filter, setFilter] = useState(orders);

  useEffect(() => {
    dispatch(getUserOrders(id));
  }, []);
  function handleFilter(e) {
    e.preventDefault();
    if (e.target.value === 'Todas') {
      setFilter(orders);
    } else {
      setFilter(orders.filter((f) => f.status === e.target.value));
    }
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
          <select onChange={handleFilter}>
            <option value="Todas">Todas las ordenes</option>
            <option value="cart">Carrito</option>
            <option value="deliveryPending">Esperando entrega</option>
            <option value="delivered">Finalizada</option>
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
          {filter.map((userOrder) => (
            <tr className="table-data">
              <td>{userOrder.orderNumber}</td>
              <td>{userOrder.endTimestamp}</td>
              <td>{userOrder.total}</td>
              <td>
                <span>{userOrder.status === 'cart' ? 'Carrito' : userOrder.status === 'deliveryPending' ? 'Esperando entrega' : 'Finalizado'}</span>
                <br />
                <select onChange={(e) => { handleChange(e); }}>
                  <option disabled> Modificar estado </option>
                  <option value="Esperando entrega" style={{ display: `${['cart', 'delivered'].includes(userOrder.status) ? 'inline' : 'none'}` }}> Esperando entrega </option>
                  <option value="Finalizada" style={{ display: `${['cart', 'deliveryPending'].includes(userOrder.status) ? 'inline' : 'none'}` }}>Finalizada</option>
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
