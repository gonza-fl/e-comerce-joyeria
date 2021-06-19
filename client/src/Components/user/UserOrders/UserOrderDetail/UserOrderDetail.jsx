/* eslint-disable react/jsx-first-prop-new-line */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable object-curly-newline */
/* eslint-disable object-property-newline */
/* eslint-disable no-unused-vars */
import React from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { URL_ORDERS_BY_ID } from '../../../../constants';
import { Link } from 'react-router-dom';
import './UserOrderDetail.css';

const UserOrderDetail = () => {
  // cuando se haga la conexion con el back, descomentar todo y borrar el objeto
  // no olvidar importar useState y useEffect

  // const {orderId} = useParams();
  // const [userOrderDetail, setUserOrderDetail] = useState('');

  // useEffect(() => {
  //   axios.get(`${URL_ORDERS_BY_ID}${orderId}`)
  //     .then((response) => {
  //       setUserOrderDetail(response.data);
  //     })
  //     .catch((err) => alert(err));
  // }, []);

  const userOrderDetailInventada = {
    id: 1, status: 'Pago Confirmado', endTimestamp: '17/06/21', total: 2190, orderNumber: '002',
    user: [{ id: '4', name: 'Juan', lastname: 'Alvarez', email: 'juan@alvarez.com', genre: 'Masculino', birthday: '02/05/08', phone: 159357,
      adress: [{ id: 2, name: 'y esto?', direction: 'La Isla Bonita', region: 'San Diego', postalCode: 1234 }] }],
    products: [{ name: 'Pulsera dorada', description: 'Es una pulsera dorada', price: 730, stockAmount: 3,
      orderLine: { cartId: 1, productId: 3, amount: 2, price: 1460 } },
    { name: 'Anillo de plata', description: 'One ring to rull em all', price: 1095, stockAmount: 1,
      orderLine: { cartId: 1, productId: 1, amount: 1, price: 1095 } },
    { name: 'Reloj', description: 'Es un reloj', price: 365, stockAmount: 5,
      orderLine: { cartId: 1, productId: 5, amount: 5, price: 1825 } },
    ],
  };

  return (
    <div className="user-order-detail-container">
      <div className="user-order-detail-products">
        <table className="user-order-detail-products-table">
          <tr>
            <th>Nombre</th>
            <th>Precio Unitario</th>
            <th>Cantidad</th>
            <th>Total</th>
            <th>Detalle</th>
          </tr>
          {userOrderDetailInventada.products.map((product) => (
            <tr className="user-order-detail-products-rows">
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.orderLine.amount}</td>
              <td>${product.orderLine.price}</td>
              <td>
                <Link className="user-order-detail-products-link"
                to={`/products/product/${product.orderLine.productId}`}
                >Ver Producto
                </Link>
              </td>
            </tr>
          ))}
        </table>
      </div>
      <div className="user-order-detail-data">
        <div className="user-order-detail-data-order">
          <p>N° de Orden: {userOrderDetailInventada.orderNumber}</p>
          <p>Fecha: {userOrderDetailInventada.endTimestamp}</p>
          <p>Estado: {userOrderDetailInventada.status}</p>
          <p>Total: ${userOrderDetailInventada.total}</p>
        </div>
        {userOrderDetailInventada.user.map((user) => (
          <div className="user-order-detail-data-user">
            <p>Nombre: {user.name}</p>
            <p>Apellido: {user.lastname}</p>
            <p>E-mail: {user.email}</p>
            {user.adress.map((adress) => (
              <div>
                <p>Dirección: {adress.direction}</p>
                <p>Región: {adress.region}</p>
                <p>Código Postal: {adress.postalCode}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserOrderDetail;
