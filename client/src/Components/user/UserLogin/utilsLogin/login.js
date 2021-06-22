/* eslint-disable consistent-return */
/* eslint-disable no-sequences */
/* eslint-disable eqeqeq */
/* eslint-disable no-return-assign */
/* eslint-disable no-unused-expressions */
import firebase from 'firebase/app';
import swal from 'sweetalert';
import 'firebase/auth';
import axios from 'axios';
import { URL_USERS, URL_ORDERS_BY_ID } from '../../../../constants';

export const loginWhitEmmail = (email, password) => {
  let idUserLoged = '';

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((res) => {
      idUserLoged = res.user.uid;
      return swal('Hola', 'Inicio de sesión exitoso', 'success');
    })
    .then(() => document.getElementById('login').style.display = 'none')
    .then(() => axios.post(URL_ORDERS_BY_ID, { id: idUserLoged, products: JSON.parse(localStorage.getItem('cart')) }))
    .then(() => localStorage.setItem('cart', JSON.stringify([])))
    .catch((error) => {
      error.message.includes('user record') && swal('Email incorrecto', 'Por favor, verifique su e-mail', 'warning');
      error.message.includes('password is invalid') && swal('Contraseña incorrecta', 'Por favor, verifique su contraseña', 'warning');
    });
};

//-------------------

const login = (provider) => {
  let users = [];
  let idUserLoged = '';

  axios.get(URL_USERS)
    .then((usersDB) => users = usersDB.data)
    .then(() => firebase.auth().signInWithPopup(provider))
    .then((res) => {
      idUserLoged = res.user.uid;
      if (!users.find((user) => user.id == res.user.uid)) {
        return axios.post(URL_USERS, {
          id: res.user.uid,
          email: res.user.email,
          displayName: res.user.displayName,
        });
      }
    })
    .then(() => { console.log('PASO'); document.getElementById('login').style.display = 'none'; })
    .then(() => axios.post(URL_ORDERS_BY_ID, { id: idUserLoged, products: JSON.parse(localStorage.getItem('cart')) }))
    .then(() => localStorage.setItem('cart', JSON.stringify([])));
};

//-----------------

export const loginWhitGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  login(provider);
};

export const loginWhitFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  login(provider);
};
