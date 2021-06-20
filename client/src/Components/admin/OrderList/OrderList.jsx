/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderListModal from './OrderListModal/OrderListModal';
import './orderList.css';
import { URL_USERS } from '../../../constants';

function OrderList() {
  // estados que hay que descomentar cuando se descomenten los useEffect
  const [users, setUsers] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  const [userId, setUserId] = useState(0);

  // axios que traeria todos los usuarios, lo dejo comentado hasta que sea funcional, mientras uso objeto inventado
  useEffect(() => {
    axios.get(URL_USERS)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => alert(err));
  }, []);

  // axios que traeria todas las ordenes de un usuario, lo dejo comentado hasta que sea funcional, mientras uso objeto inventado
  useEffect(() => {
    axios.get(`${URL_USERS}${userId}/orders`)
      .then((response) => {
        setUserOrders(response.data);
      })
      .catch((err) => alert(err));
  }, [userId]);

  const modal = document.getElementById('myModal');
  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };

  function handleClick(id) {
    setUserId(id);
    const modal1 = document.getElementById('myModal');
    modal1.style.display = 'block';
  }

  return (
    <div className="containerDiv">
      <table>
        <tr>
          <th>NOMBRE</th>
          <th>E-MAIL</th>
        </tr>
        {users.map((user) => (
          <tr className="user-data" onClick={() => handleClick(user.id)}>
            <td>{user.displayName}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </table>
      <div id="myModal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => { const modal2 = document.getElementById('myModal'); modal2.style.display = 'none'; }}>X</span>
          <OrderListModal
            userOrders={userOrders}
          />
        </div>
      </div>
    </div>
  );
}
export default OrderList;
