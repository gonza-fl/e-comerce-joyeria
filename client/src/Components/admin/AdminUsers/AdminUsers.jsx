/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './adminUsers.css';
import { URL_USERS } from '../../../constants';

function OrderList() {
  const [users, setUsers] = useState([]);

  const handleStatusChange = (e, user) => {
    e.preventDefault();
    axios.put(`${URL_USERS}${user.id}`, {
      ...user,
      role: e.target.value,
    });
  };

  useEffect(() => {
    axios.get(URL_USERS)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => alert(err));
  }, []);

  return (
    <div className="containerDiv">
      <table className="table">
        <tr>
          <th>NOMBRE</th>
          <th>E-MAIL</th>
          <th>ID</th>
          <th>ESTATUS DE USUARIO</th>
        </tr>
        {users.map((user) => (
          <tr key={user.displayName}>
            <td>{user.displayName}</td>
            <td>{user.email}</td>
            <td>{user.id}</td>
            <td>
              {user.role}
              <select onChange={(e) => { handleStatusChange(e, user); }}>
                <option>Cambiar estatus</option>
                <option value="user">usuario</option>
                <option value="admin">admin</option>
                <option value="banned">baneado</option>
              </select>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
export default OrderList;
