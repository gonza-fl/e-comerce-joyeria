/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import OrderListModal from './OrderListModal/OrderListModal';
import './orderList.css';
import { URL_USERS } from '../../../constants';
import { getUserOrders } from '../../../redux/actions/actions';

function OrderList() {
  // estados que hay que descomentar cuando se descomenten los useEffect
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  // const [userOrders, setUserOrders] = useState([]);
  const [userId, setUserId] = useState(0);
  const userOrders = useSelector((state) => state.userOrders);

  // axios que traeria todos los usuarios, lo dejo comentado hasta que sea funcional, mientras uso objeto inventado
  useEffect(() => {
    axios.get(URL_USERS)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => alert(err));
  }, []);

  // axios que traeria todas las ordenes de un usuario, lo dejo comentado hasta que sea funcional, mientras uso objeto inventado
  // useEffect(() => {
  //   dispatch(getUserOrders(userId));
  // }, [userId]);

  const modal = document.getElementById('myModal');
  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };

  function handleClick(id) {
    setUserId(id);
    dispatch(getUserOrders(id));
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
          <tr key={user.displayName} className="user-data" onClick={() => handleClick(user.id)}>
            <td>{user.displayName}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </table>
      <div id="myModal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => { const modal2 = document.getElementById('myModal'); modal2.style.display = 'none'; }}>X</span>
          <OrderListModal
            id={userId}
          />
        </div>
      </div>
    </div>
  );
}
export default OrderList;
