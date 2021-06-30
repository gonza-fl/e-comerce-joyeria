/* eslint-disable */
/* eslint-disable react/button-has-type */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import swal from 'sweetalert';
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { format, parseISO, subDays } from 'date-fns';
import { URL_GET_STATS } from '../../../constants';
import './AdminStatistics.css';

function AdminStatistics() {
  const user = useSelector((state) => state.user);
  const [type, setType] = useState('');
  const [statsInfo, setStatsInfo] = useState([]);
  
  useEffect(() => {
    if (type) {
      axios.get(`${URL_GET_STATS}${type}`, {
        headers: {
          'access-token': user.id,
        },
      })
        .then((response) => {
          const ordersWithSlicedDates = response.data.map(
            (order) => { return {...order, endTimestamp: order.endTimestamp.substr(0, 10)
            }})
          setStatsInfo(ordersWithSlicedDates);
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
        {!statsInfo.length ? null : 
          <ResponsiveContainer width="96%" height={500}>
            <AreaChart data={statsInfo}>
              <defs>
                <linearGradient id="color" x1="0" y1="0" x2="0" y2="1" >
                  <stop offset="0%" stopColor="#f0ddd8" stopOpacity={0.9} />
                  <stop offset="75%" stopColor="#f0ddd8" stopOpacity={0.3} />
                </linearGradient>
              </defs>
              <Area dataKey="total" stroke="#f0ddd8" fill="url(#color)" />
              <XAxis 
                dataKey="endTimestamp" 
                opacity={0.6} 
                tickLine={false}
                tickCount={5}
                tickFormatter={(str) => {
                  const date = parseISO(str);
                  return format(date, 'd-MMM')
                }}
              />
              <YAxis 
                dataKey="total" 
                opacity={0.6} 
                tickLine={false} 
                tickCount={5} 
                tickFormatter={(number) => `$${number}`} />
              <Tooltip content={<CustomToolTip/>} />
              <CartesianGrid opacity={0.3} vertical={false} />
            </AreaChart>
          </ResponsiveContainer>
        }
      </div>
    </div>
  );
}

export default AdminStatistics;

const CustomToolTip = ({active, payload, label}) => {
  if (active) {
    return (
      <div className="stats-tooltip">
        <h5>{format(parseISO(label), 'eeee, d MMM, yyyy')}</h5>
        <p>${payload[0].value}</p>
      </div>
    )
  }
  return null;
};
