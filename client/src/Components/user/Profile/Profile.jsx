import React from 'react';
import { useSelector } from 'react-redux';

export default function Profile() {
  const user = useSelector((state) => state.user);
  return (
    <div>
      <p>{user.email ? user.email : 'no logeado'}</p>
      <p>{user.email ? user.id : ''}</p>
    </div>
  );
}
