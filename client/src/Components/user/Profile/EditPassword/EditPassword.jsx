/* eslint-disable curly */
/* eslint-disable no-trailing-spaces */
/* eslint-disable max-len */
/* eslint-disable nonblock-statement-body-position */
import React from 'react';
import './EditPassword.css';
import firebase from 'firebase/app';
import 'firebase/auth';
import swal from 'sweetalert';
import Button from '../../../StyledComponents/Button';

export default function EditPassword() {
  const user = firebase.auth().currentUser;

  const handleClick = () => {
    firebase.auth().sendPasswordResetEmail(user.providerData[0].email)
      .then(swal('Cambio de contraseña en curso', `Le enviamos un mail a ${user.providerData[0].email}. Verifique su bandeja de entrada.`, 'success'));
  };

  if (!user || user.providerData[0].providerId !== 'password') 
    return <h2>Lo siento, esta funcionalidad solo esta disponible para usuarios registrados en K-Mora</h2>;

  return (
    <div className="editPassword">
      <h3>Si desea cambiar su contraseña presione el siguiente botón</h3>
      <Button text="Cambiar mi contraseña" handleClick={handleClick} />
    </div>
  );
}
