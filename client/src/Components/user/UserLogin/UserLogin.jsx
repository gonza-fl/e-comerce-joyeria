/* eslint-disable no-unused-expressions */
/* eslint-disable react/button-has-type */
/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import './UserLogin.css';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import swal from 'sweetalert';
import 'firebase/auth';

import logo from '../../../img/logo.png';

export default function UserLogin() {
  const [input, setInput] = useState({ email: '', password: '' });

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const googleLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then(() => window.location.reload());
  };

  const facebookLogin = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then(() => window.location.reload());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    firebase.auth().signInWithEmailAndPassword(input.email, input.password)
      .then(() => swal('Hola', 'Inicio de sesión exitoso', 'success'))
      .then(() => document.getElementById('login').style.display = 'none')
      .then(() => window.location.reload())
      .catch((error) => {
        error.message.includes('user record') && swal('Email incorrecto', 'Por favor, verifique su e-mail', 'warning');
        error.message.includes('password is invalid') && swal('Contraseña incorrecta', 'Por favor, verifique su contraseña', 'warning');
      });
  };

  return (

    <div id="login" className="loginModal">
      <form className="modalCtn animate" onSubmit={handleSubmit}>
        <div className="logoForm">
          <span className="close" onClick={() => document.getElementById('login').style.display = 'none'}>&times;</span>
          <img src={logo} alt="Kmora" />
        </div>

        <div className="ctnInputs">
          <label><b>E-mail</b></label>
          <input className="loginInput" type="text" placeholder="Ingrese su E-mail..." name="email" required autoComplete="off" onChange={handleInputChange} />

          <label><b>Contraseña</b></label>
          <input className="loginInput" type="password" placeholder="Ingrese su contraseña" name="password" required onChange={handleInputChange} />

          <input className="loginInput" type="submit" value="Iniciar Sesión" />
          <input className="loginInput " type="button" value="Iniciar con Google" name="google" onClick={googleLogin} />
          <input className="loginInput" type="button" value="Iniciar con Facebook" name="facebook" onClick={facebookLogin} />

          <div className="footLogin">
            <button className="btnCancel" onClick={() => document.getElementById('login').style.display = 'none'}>Cancelar</button>
            <Link to="#">¿Olvido su contraseña?</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
