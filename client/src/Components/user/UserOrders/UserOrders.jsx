/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './UserOrders.css';
import { URL_USERS } from '../../../constants';

const UserOrders = (props) => {
  const { id } = props;
  const [userOrders, setUserOrders] = useState([]);
  useEffect(() => {
    axios.get(`${URL_USERS}${id}/orders`)
      .then((response) => {
        // eslint-disable-next-line no-undef
        setUserOrders(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => { console.log(userOrders); }, [userOrders]);

  return (
    <div className="user-orders-container">
      <table className="user-orders-table">
        <tr>
          <th>Fecha</th>
          <th>N° de Orden</th>
          <th>Estado</th>
          <th>Total</th>
          <th>Detalle</th>
        </tr>
        {userOrders ? userOrders.map((order) => (
          <tr className="user-orders-tablerows">
            <td>{order.endTimestamp}</td>
            <td>{order.orderNumber}</td>
            <td>{order.status}</td>
            <td>{order.total}</td>
            <td>
              <Link className="user-order-link" to={`/user/order/${order.id}`}>Ver Detalle</Link>
            </td>
          </tr>
        )) : <p>wait</p>}
      </table>
      <div className="responsive-container">
        {userOrders ? userOrders.map((order) => (
          <div className="respCtn">
            <div className="respCtnDiv">
              <p><b>Fecha: </b></p>
              <p>{order.endTimestamp}</p>
            </div>
            <div className="respCtnDiv">
              <p><b>N° de Orden: </b></p>
              <p>{order.orderNumber}</p>
            </div>
            <div className="respCtnDiv">
              <p><b>Estado:</b></p>
              <p>{order.status}</p>
            </div>
            <div className="respCtnDiv">
              <p><b>Total: </b></p>
              <p>{order.total}</p>
            </div>
            <div className="respCtnDiv">
              <p><b>Detalle: </b></p>
              <Link className="user-order-link" to={`/user/order/${order.id}`}>Ver Detalle</Link>
            </div>
          </div>
        )) : <p>wait</p>}

      </div>
    </div>
  );
};

export default UserOrders;
