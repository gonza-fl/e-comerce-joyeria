/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { URL_USERS } from '../../../constants';
import { Link } from 'react-router-dom';
import './UserOrders.css';
import { URL_USERS } from '../../../constants';

const UserOrders = (props) => {
  // cuando se haga la conexion con la ruta del back, descomentar todo y borrar el array
  // no olvidar importar useState y useEffect
  const { id } = props;
  // const { userId } = useParams();
  const [userOrders, setUserOrders] = useState([]);
  useEffect(() => {
    axios.get(`${URL_USERS}${id}/orders`)
      .then((response) => {
        // eslint-disable-next-line no-undef
        setUserOrders(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

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
    </div>
  );
};

export default UserOrders;
