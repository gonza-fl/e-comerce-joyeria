/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React from 'react';
import OrderListModal from './OrderListModal/OrderListModal';
import './orderList.css';
// import axios from 'axios';
// import { URL_USERS } from '../../../constants';

function OrderList() {
  // estados que hay que descomentar cuando se descomenten los useEffect
  // const [users, setUsers] = useState('');
  // const [userOrders, setUserOrders] = useState('');
  // const [userId, setUserId] = useState('');

  // axios que traeria todos los usuarios, lo dejo comentado hasta que sea funcional, mientras uso objeto inventado
  // useEffect(() => {
  //   axios.get(URL_USERS)
  //     .then((response) => {
  //       setUsers(response.data);
  //     })
  //     .catch((err) => alert(err));
  // }, []);
  const usersInventados = [
    {
      id: 1, name: 'Pamela', lastname: 'Perez', email: 'pamela@perez.com', genre: 'Femenino', birthday: '1/1/1', phone: 123,
    },
    {
      id: 2, name: 'Franchesca', lastname: 'Dominguez', email: 'franchesca@dominguez.com', genre: 'Otro', birthday: '1/1/4', phone: 456,
    },
    {
      id: 3, name: 'Carla', lastname: 'Gonzales', email: 'carla@gonzales', genre: 'Femenino', birthday: '1/2/4', phone: 789,
    },
    {
      id: 4, name: 'Juan', lastname: 'Alvarez', email: 'juan@alvarez', genre: 'Masculino', birthday: '4/8/1', phone: 159,
    },
  ];

  // axios que traeria todas las ordenes de un usuario, lo dejo comentado hasta que sea funcional, mientras uso objeto inventado
  // useEffect(() => {
  //   axios.get(`${URL_USERS}${userId}/orders`)
  //     .then((response) => {
  //       setUserOrders(response.data);
  //     })
  //     .catch((err) => alert(err));
  // }, [userId]);
  const userOrdersInventados = [
    {
      userId: 1, id: 1, status: 'Esperando entrega', endTimestamp: '01/02/03', total: 7606, orderNumber: '001',
    },
    {
      userId: 2, id: 2, status: 'Esperando entrega', endTimestamp: '02/25/26', total: 3000, orderNumber: '002',
    },
    {
      userId: 3, id: 3, status: 'Finalizada', endTimestamp: '21/12/12', total: 200, orderNumber: '003',
    },
    {
      userId: 4, id: 4, status: 'Finalizada', endTimestamp: '05/04/21', total: 1800, orderNumber: '004',
    },
    {
      userId: 1, id: 5, status: 'Finalizada', endTimestamp: '08/10/19', total: 2145, orderNumber: '005',
    },
    {
      userId: 1, id: 6, status: 'Carrito', endTimestamp: '22/04/20', total: 1912, orderNumber: '006',
    },
    {
      userId: 2, id: 7, status: 'Finalizada', endTimestamp: '02/12/18', total: 4001, orderNumber: '007',
    },
  ];

  const modal = document.getElementById('myModal');
  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };

  function handleClick(id) {
    // setUserId(id);
    const modal1 = document.getElementById('myModal');
    modal1.style.display = 'block';
  }

  return (
    <div className="containerDiv">
      <table>
        <tr>
          <th>NOMBRE</th>
          <th>APELLIDO</th>
          <th>E-MAIL</th>
        </tr>
        {usersInventados.map((user) => (
          <tr className="user-data" onClick={() => handleClick(user.id)}>
            <td>{user.name}</td>
            <td>{user.lastname}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </table>
      <div id="myModal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => { const modal2 = document.getElementById('myModal'); modal2.style.display = 'none'; }}>X</span>
          <OrderListModal
            userOrders={userOrdersInventados}
          />
        </div>
      </div>
    </div>
  );
}
export default OrderList;
