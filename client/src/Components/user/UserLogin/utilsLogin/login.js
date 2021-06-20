/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable padded-blocks */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-return-assign */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-expressions */
import firebase from 'firebase/app';
import swal from 'sweetalert';
import 'firebase/auth';
// import axios from 'axios';
// import { URL_USERS, URL_ORDERS_BY_ID } from '../../../../constants';
  
export const loginWhitEmmail = (email, password) => {
  
  let idUserLoged = '';
  
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((res) => { 
      idUserLoged = res.user.uid; 
      return swal('Hola', 'Inicio de sesión exitoso', 'success'); 
    })
    .then(() => document.getElementById('login').style.display = 'none')
  // envio los productos cargados en el localStorage para que se agregen al cart del user que se logeo y vacio el localStorage
  // .then(() => axios.post(URL_ORDERS_BY_ID), { id: idUserLoged, products: JSON.parse(localStorage.getItem('cart')) })
  // localStorage.removeItem('cart');
    .catch((error) => {
      error.message.includes('user record') && swal('Email incorrecto', 'Por favor, verifique su e-mail', 'warning');
      error.message.includes('password is invalid') && swal('Contraseña incorrecta', 'Por favor, verifique su contraseña', 'warning');
    });
};

//-------------------

const login = (provider) => {
  firebase.auth().signInWithPopup(provider)
    .then(() => document.getElementById('login').style.display = 'none');
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
