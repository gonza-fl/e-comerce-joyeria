/* eslint-disable react/button-has-type */
/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './UserLogin.css';
import { Link } from 'react-router-dom';
import logo from '../../../img/logo.png';

export default function UserLogin() {
  return (

    <div id="login" className="loginModal">
      <form className="modalCtn animate">
        <div className="logoForm">
          <span className="close" onClick={() => document.getElementById('login').style.display = 'none'}>&times;</span>
          <img src={logo} alt="Kmora" />
        </div>

        <div className="ctnInputs">
          <label><b>E-mail</b></label>
          <input className="loginInput" type="text" placeholder="Ingrese su E-mail..." name="email" required autoComplete="off" />

          <label><b>Contraseña</b></label>
          <input className="loginInput" type="password" placeholder="Ingrese su contraseña" name="password" required />

          <input className="loginInput" type="submit" value="Iniciar Sesión" />
          <input className="loginInput " type="button" value="Iniciar con Google" name="google" />
          <input className="loginInput" type="button" value="Iniciar con Facebook" name="facebook" />

          <div className="footLogin">
            <button className="btnCancel" onClick={() => document.getElementById('login').style.display = 'none'}>Cancelar</button>
            <Link to="#">¿Olvido su contraseña?</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
