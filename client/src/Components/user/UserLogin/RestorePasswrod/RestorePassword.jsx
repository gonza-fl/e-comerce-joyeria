/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import './RestorePassword.css';

export default function RestorePassword({ defaulEmail }) {
  const [email, setEmail] = useState('');

  useEffect(() => {
    setEmail(defaulEmail);
  }, []);

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const closeRestorePass = () => {
  };
  console.log(email);

  return (
    <div id="restorePass" className="restorePasswordModal animate">
      <form className="ctnRestoreP animate" onSubmit={handleSubmit}>
        <span className="closeRestore" onClick={closeRestorePass}>&times;</span>

        <label><b>Ingrese su email para recuperar su contraseña</b></label>
        <div className="ctnInputs">
          <input defaultValue={defaulEmail} className="loginInput" type="email" placeholder="Ingrese su E-mail..." name="email" required autoComplete="off" onChange={handleInputChange} />

          <input className="loginInput" type="submit" value="Recuperar contraseña" />

          <button className="btnCancelRP" onClick={closeRestorePass}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}
