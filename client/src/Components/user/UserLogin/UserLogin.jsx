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
import logo from '../../../img/logo.png';
import RestorePassword from './RestorePasswrod/RestorePassword';
import { loginWhitEmmail, loginWhitFacebook, loginWhitGoogle } from './utilsLogin/login';

export default function UserLogin() {
  const [input, setInput] = useState({ email: '', password: '' });

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginWhitEmmail(input.email, input.password);
  };

  const closeLogin = () => {
    document.getElementById('login').style.display = 'none';
  };

  return (

    <div id="login" className="loginModal">
      <RestorePassword defaulEmail={input.email} />
      <form className="modalCtn animate" onSubmit={handleSubmit}>
        <div className="logoForm">
          <span className="closeLogin" onClick={closeLogin}>&times;</span>
          <img src={logo} alt="Kmora" />
        </div>

        <div className="ctnInputs">
          <label><b>E-mail</b></label>
          <input className="loginInput" type="text" placeholder="Ingrese su E-mail..." name="email" required autoComplete="off" onChange={handleInputChange} />

          <label><b>Contraseña</b></label>
          <input className="loginInput" type="password" placeholder="Ingrese su contraseña" name="password" required onChange={handleInputChange} />

          <input className="loginInput" type="submit" value="Iniciar Sesión" />
          <input className="loginInput " type="button" value="Iniciar con Google" name="google" onClick={loginWhitGoogle} />
          <input className="loginInput" type="button" value="Iniciar con Facebook" name="facebook" onClick={loginWhitFacebook} />

          <div className="footLogin">
            <button className="btnCancel" onClick={closeLogin}>Cancelar</button>
            <span onClick={() => document.getElementById('restorePass').style.display = 'block'}>¿Olvido su contraseña?</span>
          </div>
        </div>
        <p>¿No tienes una cuenta registrada?</p>
        <Link to="/account/register"><button className="btnCancel" onClick={closeLogin}>Crear una cuenta</button></Link>
      </form>
    </div>
  );
}
