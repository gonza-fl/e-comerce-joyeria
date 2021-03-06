/* eslint-disable no-return-assign */
/* eslint-disable no-useless-escape */
/* eslint-disable curly */
/* eslint-disable nonblock-statement-body-position */
/* eslint-disable padded-blocks */
/* eslint-disable max-len */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import './UserCreate.css';
import swal from 'sweetalert';
import firebase from 'firebase/app';
import 'firebase/auth';
import axios from 'axios';
import Button from '../../StyledComponents/Button';
import { URL_ORDERS_BY_ID, URL_USERS } from '../../../constants';

export default function UserCreate() {

  const [submit, setSubmit] = useState(false);
  const [form, setForm] = useState({
    email: '', name: '', password: '', passwordConfirmation: '', birthday: '',
  });
  const [errors, setErrors] = useState({
    email: false, password: false, number: false, empty: false,
  });

  useEffect(() => {
    setErrors({ ...errors, empty: !errors.email && !errors.password });
  }, [submit]);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (e.target.name === 'passwordConfirmation')
      setErrors(e.target.value === form.password ? { ...errors, password: false } : { ...errors, password: true });

    if (e.target.name === 'email') {
      const reg = new RegExp('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$');
      setErrors({ ...errors, email: !reg.test(form.email) });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);

    if (errors.empty) {
      let idUserLoged = '';
      document.getElementById('formUserCreate').reset();
      firebase.auth().createUserWithEmailAndPassword(form.email, form.password)
        .then((res) => {
          idUserLoged = res.user.uid;
          return axios.post(URL_USERS, {
            id: res.user.uid,
            email: res.user.email,
            displayName: `${form.name} ${form.lastname}`,
            birthday: form.birthday,
          });
        })
        .then(() => swal('Exito', 'Usuario fue creado con exito', 'success'))
        .then(() => axios.post(URL_ORDERS_BY_ID, { id: idUserLoged, products: JSON.parse(localStorage.getItem('cart')) }))
        .then(() => localStorage.setItem('cart', JSON.stringify([])))
        .then(() => window.history.back())
        .catch((err) => (err.message.includes('another account')
          ? swal('Error', 'Ya existe una cuenta asociada al email ingresado. Por favor, inicie sesi??n o intente con un email diferente', 'error')
          : swal('Error', 'Se produjo un error inesperado. Por favor, intente nuevamente', 'error')));

    } else
      swal('Error', 'Se produjo un error, por favor verifique los datos', 'warning');

  };

  return (
    <div className="formBackGrond">
      <div className="formUserCreate">
        <h2>Bienvenido a K-Mora</h2>
        <p>Reg??strate y s?? parte de nuestra tienda online.</p>

        <span id="span"><span className="require">*</span>Campos Obligatorios</span>
        <form id="formUserCreate" onSubmit={handleSubmit}>
          <div>
            <label>E-mail<span className="require">*</span> </label>
            <input name="email" type="email" placeholder="Ingrese su E-mail..." required onChange={handleInputChange} autoComplete="off" />
            <span className={submit && errors.email ? 'requireMsg' : 'transparent'}>El email ingresado es invalido</span>
          </div>
          <div>
            <label>Contrse??a<span className="require">*</span> </label>
            <input name="password" type="password" placeholder="Ingrese su Contrse??a..." required minlength="6" onChange={handleInputChange} />
          </div>

          <div>
            <label>Confirmar Contrase??a<span className="require">*</span> </label>
            <input name="passwordConfirmation" type="password" placeholder="Confirme su Contrase??a..." required minlength="6" onChange={handleInputChange} />
            <span className={errors.password ? 'requireMsg' : 'transparent'}>Las contrase??as no coinciden</span>
          </div>

          <div>
            <label>Nombre<span className="require">*</span></label>
            <input name="name" placeholder="Ingrese su Nombre..." required onChange={handleInputChange} autocomplete="off" />
          </div>

          <div>
            <label>Apellido<span className="require">*</span> </label>
            <input name="lastname" placeholder="Ingrese su Apellido..." required onChange={handleInputChange} autocomplete="off" />
          </div>

          <div>
            <label>Fecha de Nacimiento<span className="require">*</span> </label>
            <input name="birthday" type="date" required onChange={handleInputChange} />
          </div>

          <div>
            <input className="btnForm  btnBack" type="button" value="Regresar" onClick={() => window.history.back()} />
            <input className="btnForm font-color-four" type="submit" value="Crear Cuenta" />
          </div>
        </form>
        <div>
          <p>??Ya tienes un usuario?</p>
          <Button text="Iniciar Sesi??n" handleClick={() => document.getElementById('login').style.display = 'block'} />
        </div>
      </div>
    </div>

  );
}
