/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable object-curly-newline */
/* eslint-disable object-property-newline */
/* eslint-disable no-unused-vars */
import React from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { URL_ORDERS_BY_ID } from '../../../../constants';
import './OrderDetail.css';

const OrderDetail = () => {
  // useParams para usar el id de la orden, useState para guardar los datos del back
  // cuando este todo armado, descomentar el useEffect y borrar el objeto inventado

  // const { orderId } = useParams();
  // const [orderDetail, setOrderDetail] = useState('');

  // useEffect(() => {
  //   axios.get(`${URL_ORDERS_BY_ID}${orderId}`)
  //     .then((response) => {
  //       setOrderDetail(response.data);
  //     })
  //     .catch((err) => alert(err));
  // }, []);

  const orderDetailInventada = {
    id: 1, status: 'Pago Confirmado', endTimestamp: '17/06/21', total: 2190, orderNumber: '002',
    user: [{ id: '4', name: 'Juan', lastname: 'Alvarez', email: 'juan@alvarez.com', genre: 'Masculino', birthday: '02/05/08', phone: 159357,
      adress: [{ id: 2, name: 'y esto?', direction: 'La Isla Bonita', region: 'San Diego', postalCode: 1234 }] }],
    products: [{ name: 'Pulsera dorada', description: 'Es una pulsera dorada', price: 730, stockAmount: 3,
      orderLine: { cartId: 1, productId: '2', amount: 2, price: 1460 } },
    { name: 'Anillo de plata', description: 'One ring to rull em all', price: 1095, stockAmount: 1,
      orderLine: { cartId: 1, productId: '5', amount: 1, price: 1095 } },
    { name: 'Reloj', description: 'Es un reloj', price: 365, stockAmount: 5,
      orderLine: { cartId: 1, productId: '8', amount: 5, price: 1825 } },
    ],
  };

  return (
    <div className="detail-container">
      <div className="order-data">
        <p>N° de Orden: {orderDetailInventada.orderNumber}</p>
        <p>Fecha: {orderDetailInventada.endTimestamp}</p>
        <p>Total: ${orderDetailInventada.total}</p>
        <p>Estado: {orderDetailInventada.status}</p>
      </div>
      {orderDetailInventada.user.map((user) => (
        <div className="user-data-info">
          <div className="user-data-info-detail">
            <p>Nombre: {user.name}</p>
            <p>Apellido: {user.lastname}</p>
            <p>E-mail: {user.email}</p>
            <p>Género: {user.genre}</p>
            <p>Cumpleaños: {user.birthday}</p>
            <p>Teléfono: {user.phone}</p>
          </div>
          {user.adress.map((adress) => (
            <div className="user-data-info-detail">
              <p>Dirección: {adress.direction}</p>
              <p>Región: {adress.region}</p>
              <p>Código Postal: {adress.postalCode}</p>
            </div>
          ))}
        </div>
      ))}
      <div className="products-data-info">
        <table className="product-data-info-table">
          <tr>
            <th>Nombre</th>
            <th>Precio Unitario</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
          </tr>
          {orderDetailInventada.products.map((product) => (
            <tr>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.orderLine.amount}</td>
              <td>${product.orderLine.price}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default OrderDetail;
