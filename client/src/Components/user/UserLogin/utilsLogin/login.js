/* eslint-disable padded-blocks */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-return-assign */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-expressions */
import firebase from 'firebase/app';
import swal from 'sweetalert';
import 'firebase/auth';

export const loginWhitEmmail = (email, password) => {
  
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => swal('Hola', 'Inicio de sesión exitoso', 'success'))
    .then(() => document.getElementById('login').style.display = 'none')
    .catch((error) => {
      error.message.includes('user record') && swal('Email incorrecto', 'Por favor, verifique su e-mail', 'warning');
      error.message.includes('password is invalid') && swal('Contraseña incorrecta', 'Por favor, verifique su contraseña', 'warning');
    });
};

export const loginWhitGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then(() => document.getElementById('login').style.display = 'none');
};

export const loginWhitFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then(() => document.getElementById('login').style.display = 'none');
};
