/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-curly-spacing */
/* eslint-disable no-return-assign */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaUserAlt, FaShoppingCart, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import 'firebase/auth';
import swal from 'sweetalert';
import firebase from 'firebase/app';
import axios from 'axios';
import SearchBar from './SearchBar/SearchBar';
import Logo from '../../StyledComponents/Logo';
import { getCategories, showFloatingCart, getUserInfo } from '../../../redux/actions/actions';
import UserLogin from '../../user/UserLogin/UserLogin';
import './Nav.css';
import FloatingCart from '../../cart/Cart/FloatingCart';
import LeftMenu from './SearchBar/LeftMenu/LeftMenu';
import ResponsiveMenu from './ResponsiveMenu/ResponsiveMenu';
import { URL_USERS } from '../../../constants';

export default function Nav() {
  const dispatch = useDispatch();
  const logged = useSelector((state) => state.user);
  const [userData, setUserData] = useState({ role: '' });
  const user = useSelector((state) => state.userInfo);

  useEffect(() => {
    if (logged.id) {
      dispatch(getUserInfo(logged.id));
    }
  }, [logged]);

  useEffect(() => {
    if (user.id) {
      axios.get(`${URL_USERS}${user.id}`)
        .then((res) => setUserData(res.data));
    }
  }, [user]);

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
      <div className="nav bg-color-three">
        <div className="leftMenuNav"><LeftMenu userData={userData} /></div>

        <div className="homeResponsive" onClick={() => document.getElementById('respMenu').style = 'display:flex'}>
          <FaBars />
        </div>
        <div><ResponsiveMenu /></div>
        {userData && ((userData.role === 'admin' || userData.role === 'superAdmin')) && <Link to="/admin"> <div className="adminNavResponsive">ADMINISTRADOR</div></Link>}
        <div className="logoNav">
          <Logo width="200px" height="150px" style={{ flexGrow: 1 }} />
        </div>

        <div className="rigthMenuNav">
          <div className="SearchBarNav">
            <SearchBar />
          </div>
          <div className="userIcon">
            <div className="navIconUser"><FaUserAlt />
              &nbsp; &nbsp;
              {user.email ? <b className="nameTablet">{user.name.split(' ')[0].substr(0, 8)}</b> : null}
              {user.id
                ? (
                  <div className="userOptions">
                    <Link to="/account/profile"><p>Mi Cuenta</p></Link>
                    <Link to="#logout"> <p onClick={ handleSingOut}> Cerrar Sesión</p> </Link>
                  </div>
                )
                : (
                  <div className="userOptions">
                    <Link to="#login"><p onClick={() => document.getElementById('login').style.display = 'block'}>Iniciar Sesión</p></Link>
                    <Link to="/account/register"><p>Registrarme</p></Link>
                  </div>
                )}
            </div>
            <div className="navIconCart">
              <FaShoppingCart
                onMouseEnter={() => dispatch(showFloatingCart('inline'))}
              />
            </div>
            <FloatingCart />
          </div>
        </div>
      </div>
    </div>
  );
}
