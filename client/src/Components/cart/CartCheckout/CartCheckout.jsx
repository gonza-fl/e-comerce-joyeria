/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
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
import AddAdressModal from '../../user/Profile/AddAdressModal';
import './CartCheckout.css';

export default function CartCheckout() {
  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.user);
  const userDetail = useSelector((state) => state.userInfo);
  const [cartProducts, setCartProducts] = useState([]);
  const [subtotal, setSubtotal] = useState('');
  const [total, setTotal] = useState('');
  const [addAdress, setAddAdress] = useState('none');
  const [pivot, setPivot] = useState(false);
  const [payButton, setPayButton] = useState('disabled');
  const [delivery, setDelivery] = useState(0);
  const [address, setAddress] = useState({
    id: '', address: '', state: '', city: '',
  });
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

  function numberWithCommas(x) {
    x = x.toFixed(2);
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  useEffect(() => {
    if (userStatus.id) {
      dispatch(getUserInfo(userStatus.id || null));
      axios.get(`${URL_GET_CART}${userStatus.id}/cart`)
        .then((res) => {
          if (res.data[0].products.length > 0) {
            setPaymentData({
              ...paymentData,
              referenceCode: `${userStatus.id}-${res.data[0].id}-${Math.floor(Math.random() * 1000)}`,
              buyerEmail: userStatus.email,
            });
            setCartProducts(res.data[0].products.map((p) => ({ ...p, amount: p.orderline.amount })));
          } else {
            setCartProducts([]);
          }
        });
    }
  }, [userStatus, pivot]);

  useEffect(() => {
    setSubtotal(cartProducts.length > 0 ? numberWithCommas(cartProducts.map((p) => parseFloat(p.orderline.subtotal)).reduce((res, amount) => res + amount)) : '');
    setTotal(cartProducts.length > 0 ? cartProducts.map((p) => parseFloat(p.orderline.subtotal)).reduce((res, amount) => res + amount) + delivery : '');
  }, [cartProducts, address]);

  function selectAddress(e) {
    const addressSelected = userDetail.addresses.filter((a) => parseFloat(a.id) === parseFloat(e.target.value))[0];
    setAddress(
      {
        id: addressSelected.id, address: addressSelected.address, state: addressSelected.state, city: addressSelected.state,
      },
    );
    if (addressSelected.state !== 'Antioquia') {
      setDelivery(11000);
    } else if (addressSelected.state !== 'Medellín') {
      setDelivery(6000);
    } else {
      setDelivery(5000);
    }
    setPayButton('');
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
                  <div>
                    <input type="radio" name="address" value={a.id} onChange={selectAddress} />
                    <b>{a.description}</b>
                  </div>
                  <span>{a.address}</span>
                  <span>{a.city}</span>
                  <span>{a.state}</span>
                </div>
              </div>
            )) : <div><h3>No tienes direcciones agregadas</h3></div>}

        </div>
        <button type="button" className="button-add-direction bg-color-three" onClick={() => setAddAdress(true)}>Agregar dirección</button>
      </div>
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
                  {numberWithCommas(p.orderline.subtotal)}
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
                {subtotal}
              </b>
              <br />
              <b>
                $
                {numberWithCommas(delivery)}
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
              {cartProducts.length > 0 && numberWithCommas(cartProducts.map((p) => parseFloat(p.orderline.subtotal)).reduce((res, amount) => res + amount) + delivery)}

            </b>
          </div>
          <div>
            <form method="POST" action="https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu">
              <input name="merchantId" type="hidden" value={paymentData.merchantId} />
              <input name="accountId" type="hidden" value={paymentData.accountId} />
              <input name="ApiKey" type="hidden" value={paymentData.ApiKey} />
              <input name="description" type="hidden" value={paymentData.description} />
              <input name="referenceCode" type="hidden" value={paymentData.referenceCode} />
              <input name="amount" type="hidden" value={total} />
              <input name="tax" type="hidden" value={paymentData.tax} />
              <input name="taxReturnBase" type="hidden" value={paymentData.taxReturnBase} />
              <input name="currency" type="hidden" value={paymentData.currency} />
              <input name="signature" type="hidden" value={CryptoJS.MD5(`${paymentData.ApiKey}~${paymentData.merchantId}~${paymentData.referenceCode}~${total}~${paymentData.currency}`)} />
              <input name="test" type="hidden" value="1" />
              <input name="buyerFullName" type="hidden" value={userStatus.name} />
              <input name="buyerEmail" type="hidden" value={userStatus.email} />
              <input name="shippingAddress" type="hidden" value={address.address} />
              <input name="shippingCity" type="hidden" value={address.city} />
              <input name="shippingCountry" type="hidden" value="CO" />
              <input name="telephone" type="hidden" value={userDetail.phone} />
              <input name="responseUrl" type="hidden" value="http://localhost:3000/cart/payment/response" />
              <input name="confirmationUrl" type="hidden" value="http://localhost:3001/api/order" />
              <input name="Submit" type="submit" className="button-pay-cc bg-color-three" value="PAGAR" disabled={payButton} />
            </form>
          </div>
        </div>
      </div>
      <AddAdressModal show={addAdress} setAddAdress={setAddAdress} userId={userStatus.id} pivot={pivot} setPivot={setPivot} />
    </div>
  );
}
