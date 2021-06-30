/* eslint-disable react/button-has-type */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import swal from 'sweetalert';
import { URL_GET_STATS } from '../../../constants';
import './AdminStatistics.css';

function AdminStatistics() {
  const user = useSelector((state) => state.user);
  const [type, setType] = useState('');
  const [chartData, setChartData] = useState([]);
  console.log(chartData);
  useEffect(() => {
    if (type) {
      axios.get(`${URL_GET_STATS}${type}`, {
        headers: {
          'access-token': user.id,
        },
      })
        .then((response) => {
          setChartData(response.data);
        })
        .catch((err) => swal('Error', err.response.data, 'warning'));
    }
  }, [type]);

  const handleType = (e) => {
    setType(e.target.value);
  };

  return (
    <div className="stats-container">
      <div className="stats-sales-btn">
        <button className="sales-btn" value="totalsPerDate" onClick={(e) => handleType(e)}>Ventas por Mes</button>
        <button className="sales-btn" value="productAmountPerDate" onClick={(e) => handleType(e)}>Ventas según Productos</button>
        <button className="sales-btn" value="totalsPerDateByUsers" onClick={(e) => handleType(e)}>Ventas según Usuarios</button>
        <button className="sales-btn" value="totalsPerDate" onClick={(e) => handleType(e)}>Ventas por Año</button>
      </div>
      <div className="stats-chart-container">
        Gráfico aquí
      </div>
    </div>
  );
}

export default AdminStatistics;
