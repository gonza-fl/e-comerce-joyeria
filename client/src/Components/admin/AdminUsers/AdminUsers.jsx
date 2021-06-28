/* eslint-disable no-prototype-builtins */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import './adminUsers.css';
import { URL_USERS } from '../../../constants';

function OrderList() {
  const [users, setUsers] = useState([]);

  const handleStatusChange = (e, user) => {
    e.preventDefault();
    swal({
      title: `¿esta seguro de que quiere que ${user.displayName} tenga rol de ${e.target.value}?`,
      text: '',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.put(`${URL_USERS}${user.id}`, {
          ...user,
          role: e.target.value,
        })
          .then((res) => {
            if (res.data.hasOwnProperty('err')) {
              swal('Error', res.data.err, 'warning');
            } else {
              swal(`¡El status de ${user.displayName} ha cambiado con éxito!`, {
                icon: 'success',
              });
              window.location.href = '/admin/users';
            }
          })
          .catch(() => {
            swal('Error', 'Ocurrió un error. No se pudo cambiar el status. Intente nuevamente');
          });
      } else {
        swal('¡El status no ha cambiado!');
      }
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
      <div className="keysA">
        <tr className="tr1">
          <th>NOMBRE</th>
          <th>E-MAIL</th>
          <th>ID</th>
          <th>ESTATUS</th>
        </tr>
      </div>
      {users.map((user) => (
        <table className="table">
          <div className="keysB">
            <tr className="tr">
              <th>NOMBRE</th>
              <th>E-MAIL</th>
              <th>ID</th>
              <th>ESTATUS</th>
            </tr>
          </div>
          <div className="values">
            <tr key={user.displayName} className="tr">
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
          </div>
          <div className="valuesA">
            <tr key={user.displayName} className="tr2">
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
          </div>
        </table>
      ))}

    </div>
  );
}
export default OrderList;
