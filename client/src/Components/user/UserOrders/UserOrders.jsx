/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import './UserOrders.css';
import { URL_USERS } from '../../../constants';

const UserOrders = (props) => {
  const { id } = props;
  const [userOrders, setUserOrders] = useState([]);
  useEffect(() => {
    axios.get(`${URL_USERS}${id}/orders`)
      .then((response) => {
        setUserOrders(response.data);
      })
      .catch((err) => swal('Error', err.response.data, 'warning'));
  }, []);

  return (
    <div className="user-orders-container">
      {userOrders.length ? <h2>No tienes órdenes de compra</h2>
        : (
          <table className="user-orders-table">
            <tr>
              <th>Fecha</th>
              <th>N° de Orden</th>
              <th>Estado</th>
              <th>Total</th>
              <th>Detalle</th>
            </tr>
            {userOrders.filter((order) => order.status !== 'cart').map((order) => (
              <tr className="user-orders-tablerows">
                <td>{order.endTimestamp}</td>
                <td>{order.orderNumber}</td>
                <td>{order.status}</td>
                <td>{order.total}</td>
                <td>
                  <Link className="user-order-link" to={`/user/order/${order.id}`}>Ver Detalle</Link>
                </td>
              </tr>
            ))}
          </table>
        )}
      <div className="responsive-container">
        {userOrders ? userOrders.filter((order) => order.status !== 'cart').map((order) => (
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
