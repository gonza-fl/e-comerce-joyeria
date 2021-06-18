import React from 'react';
import firebase from 'firebase/app';

export default function Profile() {
  const user = firebase.auth().currentUser;

  return (
    <div>
      <p>{user ? user.email : 'no logeado'}</p>
      <p>{user ? user.uid : ''}</p>
    </div>
  );
}
