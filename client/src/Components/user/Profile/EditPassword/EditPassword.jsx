import React from 'react';
import './EditPassword.css';
import firebase from 'firebase/app';
import 'firebase/auth';

export default function EditPassword() {
  const user = firebase.auth().currentUser;
  console.log(user.providerData);
  // if (user) user.updatePassword('123123').then(() => alert('yes'));

  return (
    <div />
  );
}
