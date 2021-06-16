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
import Button from '../StyledComponents/Button';

export default function UserCreate() {
  const [submit, setSubmit] = useState(false);
  const [form, setForm] = useState({
    email: '', name: '', password: '', passwordConfirmation: '', date: '', genre: 'Seleccionar',
  });

  const [errors, setErrors] = useState({
    email: false, password: false, empty: false,
  });

  useEffect(() => {
    setErrors({ ...errors, empty: !errors.email && !errors.password && form.genre !== 'Seleccionar' });
  }, [form]);

  const handleInputChange = (e) => {

    setForm({ ...form, [e.target.name]: e.target.value });

    if (e.target.name === 'passwordConfirmation')
      setErrors(e.target.value === form.password ? { ...errors, password: false } : { ...errors, password: true });

    if (e.target.name === 'email') {
      const reg = new RegExp('^[^@]+@[^@]+\.[a-zA-Z]{2,}$');
      setErrors({ ...errors, email: !reg.test(form.email) });
    }
  };
  const handleSubmit = (e) => {

    e.preventDefault();
    setSubmit(true);
    if (errors.empty) {
      document.getElementById('formUserCreate').reset();
      swal('Exito', 'Usuario fue creado con exito', 'success');
    } else
      swal('Error', 'Se produjo un error, por favor verifique los datos', 'warning');
      // "swal-button swal-button--confirm"
  };

  return (
    <div className="formBackGrond">
      <div className="formUserCreate">
        <h2>Bienvenido a K-Mora</h2>
        <p>Regístrate y sé parte de nuestra tienda online.</p>

        <span><span className="require">*</span>Campos Obligatorios</span>
        <form id="formUserCreate" onSubmit={handleSubmit}>
          <div>
            <label>E-mail<span className="require">*</span> </label>
            <input name="email" type="email" placeholder="Ingrese su E-mail..." required onChange={handleInputChange} />
            <span className={submit && errors.email ? 'requireMsg' : 'transparent'}>El email ingresado es invalido</span>
          </div>
          <div>
            <label>Contrseña<span className="require">*</span> </label>
            <input name="password" type="password" placeholder="Ingrese su Contrseña..." required minlength="6" onChange={handleInputChange} />
          </div>

          <div>
            <label>Confirmar Contraseña<span className="require">*</span> </label>
            <input name="passwordConfirmation" type="password" placeholder="Confirme su Contraseña..." required minlength="6" onChange={handleInputChange} />
            <span className={errors.password ? 'requireMsg' : 'transparent'}>Las contraseñas no coinciden</span>
          </div>

          <div>
            <label>Nombre<span className="require">*</span></label>
            <input name="name" placeholder="Ingrese su Nombre..." required onChange={handleInputChange} />
          </div>

          <div>
            <label>Apellido<span className="require">*</span> </label>
            <input name="lastname" placeholder="Ingrese su Apellido..." required onChange={handleInputChange} />
          </div>

          <div>
            <label>Fecha de Nacimiento<span className="require">*</span> </label>
            <input name="date" type="date" required onChange={handleInputChange} />
          </div>

          <div>
            <label>Género<span className="require">*</span></label>
            <select name="genre" onChange={handleInputChange}>
              <option>Seleccionar</option>
              <option>Masculino</option>
              <option>Femenino</option>
              <option>Sin Género</option>
            </select>
            <span className={submit && form.genre === 'Seleccionar' ? 'requireMsg' : 'transparent'}>Seleccione un género</span>
          </div>

          <div>
            <input className="btnForm  btnBack" type="button" value="Regresar" onClick={() => window.history.back()} />
            <input className="btnForm font-color-four" type="submit" value="Crear Cuenta" />
          </div>
        </form>
        <div>
          <p>¿Ya tienes un usuario?</p>
          <Button text="Iniciar Sesion" />
        </div>
      </div>
    </div>

  );
}
