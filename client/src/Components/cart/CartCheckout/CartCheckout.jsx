/* eslint-disable react/no-this-in-sfc */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-return-assign */
/* import/no-unresolved": "off". */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CryptoJS from 'crypto-js';
import { URL_GET_CART } from '../../../constants';
import { getUserInfo } from '../../../redux/actions/actions';
import Button from '../../StyledComponents/Button';
import './CartCheckout.css';

export default function CartCheckout() {
  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.user);
  const userDetail = useSelector((state) => state.userInfo);
  const [cartProducts, setCartProducts] = useState([]);
  const [paymentData, setPaymentData] = useState({
    merchantId: '508029',
    accountId: '512321',
    ApiKey: '4Vj8eK4rloUd272L48hsrarnUA',
    description: 'k-mora-payment',
    referenceCode: '',
    amount: '',
    tax: '0',
    taxReturnBase: '0',
    currency: 'COP',
    signature: '',
    buyerEmail: userStatus.email,
  });

  useEffect(() => {
    if (userStatus.id) {
      dispatch(getUserInfo(userStatus.id || null));
      axios.get(`${URL_GET_CART}${userStatus.id}/cart`)
        .then((res) => {
          if (res.data[0].products.length > 0) {
            setPaymentData({
              ...paymentData,
              referenceCode: `PAYMENT-${res.data[0].id}`,
              amount: res.data[0].products.map((p) => ({ ...p, amount: p.orderline.amount })).map((p) => parseFloat(p.orderline.subtotal)).reduce((sum, amount) => sum + amount),
            });
            // setPaymentData({ ...paymentData, signature: CryptoJS.MD5(`${paymentData.ApiKey}~${paymentData.merchantId}~${userStatus.id + res.data[0].id}~${paymentData.amount}~${paymentData.currency}`) });
            setCartProducts(res.data[0].products.map((p) => ({ ...p, amount: p.orderline.amount })));
          } else {
            setCartProducts([]);
          }
        });
    }
  }, [userStatus]);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  if (!Object.keys(userStatus).length) {
    return (
      <div>
        <h3>Por favor, para continuar inicie sesión</h3>
        <Button text="Iniciar Sesión" handleClick={() => document.getElementById('login').style.display = 'block'} />
      </div>
    );
  }

  return (
    <div className="main-box-cc">
      <div className="card-box-container" style={{ flexGrow: '0.5' }}>
        <div className="bg-color-three card-box-title"><b>DIRECCIONES DE ENVÍO</b></div>
        <div className="bg-color-six addresses-container-cc">
          {userDetail.addresses && userDetail.addresses.length > 0
            ? userDetail.addresses.map((a) => (
              <div className="address-container-cc">
                <div className="address-box-cc">
                  <b>{a.description}</b>
                  <span>{a.name}</span>
                  <span>{a.address}</span>
                  <span>{a.postalCode}</span>
                </div>
                <div><button type="button" className="button-edit-cc bg-color-three">Editar</button></div>
              </div>
            )) : <div><h3>No tienes direcciones agregadas</h3></div>}
        </div>
      </div>
      {/* <div className="card-box-container">
        <div className="bg-color-three card-box-title"><b>MÉTODOS DE PAGO</b></div>
      </div> */}
      <div className="card-box-container">
        <div className="bg-color-three card-box-title"><b>DETALLE DE LA COMPRA</b></div>
        <div className="bg-color-six addresses-container-cc">
          {cartProducts.map((p) => (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={p.images[0].url} alt="Not found" height="60px" />
                <div style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '0px 10px',
                }}
                >
                  <b>{p.name}</b>
                  <span>
                    Cantidad:
                    {' '}
                    {p.amount}
                  </span>
                </div>
              </div>
              <div>
                <b>
                  $
                  {' '}
                  {numberWithCommas(p.price)}
                </b>
              </div>
            </div>
          ))}
          <div style={{
            display: 'flex', justifyContent: 'space-between', padding: '10px 10px', fontSize: '17px',
          }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <b>
                SUBTOTAL:
              </b>
              <b>
                ENVÍO:
              </b>
            </div>
            <div>
              <b>
                $
                {cartProducts.length > 0 && numberWithCommas(cartProducts.map((p) => parseFloat(p.orderline.subtotal)).reduce((res, amount) => res + amount))}
              </b>
              <br />
              <b>
                $40,000
              </b>
            </div>
          </div>

          <div style={{
            fontSize: '20px', padding: '5px 0px', color: 'white', backgroundColor: 'black',
          }}
          >
            <b>
              TOTAL:
              {' '}
              $
              {cartProducts.length > 0 && numberWithCommas(cartProducts.map((p) => parseFloat(p.orderline.subtotal)).reduce((res, amount) => res + amount))}

            </b>
          </div>
          <div>
            <form method="POST" action="https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu">
              <input name="merchantId" type="hidden" value={paymentData.merchantId} />
              <input name="accountId" type="hidden" value={paymentData.accountId} />
              <input name="ApiKey" type="hidden" value={paymentData.ApiKey} />
              <input name="description" type="hidden" value={paymentData.description} />
              <input name="referenceCode" type="hidden" value={paymentData.referenceCode} />
              <input name="amount" type="hidden" value={paymentData.amount} />
              <input name="tax" type="hidden" value={paymentData.tax} />
              <input name="taxReturnBase" type="hidden" value={paymentData.taxReturnBase} />
              <input name="currency" type="hidden" value={paymentData.currency} />
              <input name="signature" type="hidden" value={CryptoJS.MD5(`${paymentData.ApiKey}~${paymentData.merchantId}~${paymentData.referenceCode}~${paymentData.amount}~${paymentData.currency}`)} />
              <input name="test" type="hidden" value="1" />
              <input name="buyerFullName" type="hidden" value={userStatus.name} />
              <input name="buyerEmail" type="hidden" value={userStatus.email} />
              <input name="shippingAddress" type="hidden" value="Calle 65# 56-84, apto 536" />
              <input name="shippingCity" type="hidden" value="Medellin" />
              <input name="shippingCountry" type="hidden" value="CO" />
              <input name="telephone" type="hidden" value="3152639144" />
              <input name="responseUrl" type="hidden" value="http://localhost:3000/cart/payment/response" />
              <input name="confirmationUrl" type="hidden" value="http://localhost:3000/cart/payment/confirmation" />
              <input name="Submit" type="submit" className="button-pay-cc bg-color-three" value="PAGAR" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
