import React from 'react';
import { useSelector } from 'react-redux';

export default function Profile() {
  const user = useSelector((state) => state.user);

  return (
    <div>
      {user.email
        ? (
          <div>
            <p>{user.email}</p>
            <p>{user.id }</p>
            <p>{user.name}</p>
          </div>
        )

        : <div><p>no logeado</p></div>}

    </div>
  );
}
