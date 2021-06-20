/* eslint linebreak-style: ["error", "windows"] */
import React from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { URL_USERS } from '../../../constants';
import { Link } from 'react-router-dom';
import './UserOrders.css';

const UserOrders = () => {
  // cuando se haga la conexion con la ruta del back, descomentar todo y borrar el array
  // no olvidar importar useState y useEffect

  // const { userId } = useParams();
  // const [userOrders, setUserOrders] = useState('');

  // useEffect(() => {
  //   axios.get(`${URL_USERS}${userId}/orders`)
  //     .then((response) => {
  //       setUserOrders(response.data);
  //     })
  //     .catch((err) => alert(err));
  // }, []);

  const userOrdersInventados = [
    {
      userId: 1, id: 1, status: 'Pago Confirmado', endTimestamp: '01/02/03', total: 7606, orderNumber: '001',
    },
    {
      userId: 2, id: 2, status: 'Pago Confirmado', endTimestamp: '02/25/26', total: 3000, orderNumber: '002',
    },
    {
      userId: 3, id: 3, status: 'Entregado', endTimestamp: '21/12/12', total: 200, orderNumber: '003',
    },
    {
      userId: 4, id: 4, status: 'Entregado', endTimestamp: '05/04/21', total: 1800, orderNumber: '004',
    },
    {
      userId: 1, id: 5, status: 'Entregado', endTimestamp: '08/10/19', total: 2145, orderNumber: '005',
    },
    {
      userId: 1, id: 6, status: 'Pago Confirmado', endTimestamp: '22/04/20', total: 1912, orderNumber: '006',
    },
    {
      userId: 2, id: 7, status: 'Entregado', endTimestamp: '02/12/18', total: 4001, orderNumber: '007',
    },
  ];

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
        {userOrdersInventados.map((order) => (
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
    </div>
  );
};

export default UserOrders;
