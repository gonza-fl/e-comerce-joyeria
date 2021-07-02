/* eslint-disable no-prototype-builtins */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import './adminUsers.css';
import { useSelector } from 'react-redux';
import { URL_USERS } from '../../../constants';

function OrderList() {
  const [users, setUsers] = useState([]);
  const userState = useSelector((state) => state.user);
  const [adminData, setAdminData] = useState('');

  const handleStatusChange = (e, user) => {
    e.preventDefault();
    swal({
      title: `¿Está seguro que quiere que ${user.displayName} tenga rol de ${e.target.value}?`,
      text: '',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.put(`${URL_USERS}${user.id}`, {
          ...user,
          role: e.target.value,
        }, {
          headers: {
            'access-token': userState.id,
          },
        })
          .then((res) => {
            if (res.data.hasOwnProperty('err')) {
              return swal('Error', res.data.err, 'warning');
            }
            return swal('¡Muy bien!', `¡El status de ${user.displayName} ha cambiado con éxito!`, 'success');
          }).then(() => {
            window.location.href = '/admin/users';
          })
          .catch((err) => {
            swal('Error', err.response.data, 'warning');
          });
      } else {
        swal('¡El status no ha cambiado!');
      }
    });
  };

  useEffect(() => {
    axios.get(`${URL_USERS}${userState.id}`)
      .then((res) => setAdminData(res.data));
    axios.get(URL_USERS)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => { swal('Error', err.response.data, 'warning'); });
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
                { user.role === 'superAdmin' ? null : (
                  <select onChange={(e) => { handleStatusChange(e, user); }}>
                    <option>Cambiar status</option>
                    <option value="user">usuario</option>
                    {adminData.role === 'superAdmin' ? <option value="admin">admin</option> : null}
                    <option value="banned">baneado</option>
                  </select>
                )}
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
                { user.role === 'superAdmin' ? null : (
                  <select onChange={(e) => { handleStatusChange(e, user); }}>
                    <option>Cambiar status</option>
                    <option value="user">usuario</option>
                    {adminData.role === 'superAdmin' ? <option value="admin">admin</option> : null}
                    <option value="banned">baneado</option>
                  </select>
                )}
              </td>
            </tr>
          </div>
        </table>
      ))}

    </div>
  );
}
export default OrderList;
