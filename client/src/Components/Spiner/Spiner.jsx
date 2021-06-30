/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import logo from '../../img/spiner.png';
import './Spiner.css';

export default function Spiner({ msg }) {
  const [loading, setLoading] = useState(true);

  const load = () => {
    setTimeout(() => setLoading(false), 3500);
  };
  useEffect(() => {
    load();
  }, []);

  if (!loading) return <h1 className="spinerMSG">{msg}</h1>;
  return (
    <div className="spinerCtn">
      <img className="spiner" src={logo} alt="" />
      <h1>Cargando...</h1>
    </div>
  );
}
