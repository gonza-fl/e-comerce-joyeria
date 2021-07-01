/* eslint-disable */
/* eslint-disable react/button-has-type */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import swal from 'sweetalert';
import { getProducts } from '../../../redux/actions/actions';
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { format, parseISO } from 'date-fns';
import { URL_GET_STATS, URL_USERS } from '../../../constants';
import './AdminStatistics.css';

function AdminStatistics() {
  const user = useSelector((state) => state.user);
  const [type, setType] = useState('');
  const [statsInfo, setStatsInfo] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(0);
  const [datePicked, setDatePicked] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
    axios.get(URL_USERS)
    .then((response) => {
      setAllUsers(response.data);
    })
    .catch((err) => swal('Error', err.response.data, 'warning'));
  }, []);

  useEffect(() => {
    if (datePicked) {
      if (type === 'totalsPerDate') {
        const request = {type, date: datePicked};
        axios.post(URL_GET_STATS, request, {
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
          .catch((err) => {setStatsInfo([]); 
          return swal('Error', err.response.data, 'warning')});
      }

      if (type === 'productAmountPerDate' && selectedProductId) {
        console.log('holis');
        const request = {type, productId: selectedProductId, date: datePicked}
        axios.post(URL_GET_STATS, request, {
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
        .catch((err) => {setStatsInfo([]); 
          return swal('Error', err.response.data, 'warning')});
      }

      if (type === 'totalsPerDateByUsers' && selectedUserId) {
        const request = {type, userId: selectedUserId, date: datePicked};
        axios.post(URL_GET_STATS, request, {
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
          .catch((err) => {setStatsInfo([]); 
            return swal('Error', err.response.data, 'warning')});
      }
    }
  }, [type, selectedProductId, datePicked, selectedUserId]);

  const handleType = (e) => {
    setType(e.target.value);
  };

  const handleProductSelected = (e) => {
    setSelectedProductId(e.target.value);
  };

  const handleUserSelected = (e) => {
    setSelectedUserId(e.target.value);
  };

  const handleReset = () => {
    setType('');
    setStatsInfo([]);
    setSelectedProductId(0);
    setSelectedUserId('');
  };

  const handleDate = (e) => {
    setDatePicked(e.target.value);
  };

  return (
    <div className="stats-container">
      <div className="stats-sales-btn">
        <input type="month" onChange={(e) => handleDate(e)} />
        <button className="sales-btn" value="totalsPerDate" onClick={(e) => handleType(e)}>Ventas por Mes</button>
        <button className="sales-btn" value="productAmountPerDate" onClick={(e) => handleType(e)}>Ventas según Productos</button>
        {type === 'productAmountPerDate' &&
        <select onChange={handleProductSelected} >
          <option value="">Selecciona un producto</option>
          {products.map((product) =>
            <option value={product.id}>{product.name}</option>
          )}
        </select>
      }
        <button className="sales-btn" value="totalsPerDateByUsers" onClick={(e) => handleType(e)}>Ventas según Usuarios</button>
        {type === 'totalsPerDateByUsers' &&
        <select onChange={handleUserSelected}>
          <option value="">Selecciona un usuario</option>
          {allUsers.map((usermapped) =>
            <option value={usermapped.id}>{usermapped.displayName}</option>
          )}
        </select>
        }
        <button className="sales-btn" onClick={() => handleReset()}>Limpiar</button>
      </div>
      
      <div className="stats-chart-container">
        {!statsInfo.length ? null : 
          <ResponsiveContainer width="96%" height={500}>
            <AreaChart data={statsInfo}>
              <defs>
                <linearGradient id="color" x1="0" y1="0" x2="0" y2="1" >
                  <stop offset="5%" stopColor="#f0ddd8" stopOpacity={1} />
                  <stop offset="95%" stopColor="#f0ddd8" stopOpacity={0.5} />
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
        <p className="stats-tooltip-payload">Total: ${payload[0].value}</p>
      </div>
    )
  }
  return null;
};
