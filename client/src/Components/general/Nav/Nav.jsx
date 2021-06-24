/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-curly-spacing */
/* eslint-disable no-return-assign */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaUserAlt, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import 'firebase/auth';
import swal from 'sweetalert';
import firebase from 'firebase/app';
import SearchBar from './SearchBar/SearchBar';
import Logo from '../../StyledComponents/Logo';
import { getCategories, showFloatingCart } from '../../../redux/actions/actions';
import UserLogin from '../../user/UserLogin/UserLogin';
import './Nav.css';
import FloatingCart from '../../cart/Cart/FloatingCart';
import LeftMenu from './SearchBar/LeftMenu/LeftMenu';
import logo from '../../../img/logo2.png';

const ADMIN_IDS = process.env.REACT_APP_ADMIN_IDS;
ADMIN_IDS.split(',');

export default function Nav() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const handleSingOut = () => {
    firebase.auth().signOut()
      .then(() => swal('Adios', 'Cerro Sesión correctamente', 'success'))
      .then(() => window.location.href = window.location.origin)
      .then(() => localStorage.setItem('cart', '[]'));
  };

  return (
    <div className="ctnNav bg-color-three">
      <UserLogin />
      {ADMIN_IDS.includes(user.id) && <Link to="/admin" className="link-without-styles"><div className="adminNav">PANEL DE ADMINISTRADOR </div> </Link>}
      <div className="nav bg-color-three">
        <div className="leftMenuNav"><LeftMenu /></div>

        <div className="logoNav">
          <Logo width="200px" height="150px" style={{ flexGrow: 1 }} />
        </div>
        <img className="logoResponsive" src={logo} alt="" />

        <div className="rigthMenuNav">
          <div className="SearchBarNav">
            <SearchBar />
          </div>
          {user.email ? <h3>{user.name}</h3> : null}

          <div className="userIcon" style={{ flexGrow: 0.1, fontSize: '120%' }}>
            <div className="navIcon"><FaUserAlt /></div>
            {user.id
              ? (
                <div className="userOptions">
                  <Link to="/account/profile"><p>Mi Cuenta</p></Link>
                  <Link to="#logout"> <p onClick={ handleSingOut}> Cerrar Sesion</p> </Link>
                </div>
              )
              : (
                <div className="userOptions">
                  <Link to="#login"><p onClick={() => document.getElementById('login').style.display = 'block'}>Iniciar Sesión</p></Link>
                  <Link to="/account/register"><p>Registrarme</p></Link>
                </div>
              )}
          </div>
          <div className="navIcon" style={{ flexGrow: 0.1, fontSize: '120%' }}>

            <FaShoppingCart
              style={{ fontSize: '20px' }}
              onMouseEnter={() => dispatch(showFloatingCart('inline'))}
            />
          </div>

          <FloatingCart />
        </div>
      </div>
    </div>
  );
}
