/* eslint-disable react/button-has-type */
import React from 'react';
import './EditPassword.css';
import firebase from 'firebase/app';
import 'firebase/auth';

export default function EditPassword() {
  // const user = firebase.auth().currentUser;
  // if (user) user.updatePassword('123123').then(() => alert('yes'));

  const handleClick = () => {
    firebase.auth().sendPasswordResetEmail('tassone_af@yahoo.com').then(alert('yes)'));
  };
  return (
    <div>
      <button onClick={handleClick}>click</button>
    </div>
  );
}
