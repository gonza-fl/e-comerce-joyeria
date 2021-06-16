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

export default function UserCreate() {
  const [submit, setSubmit] = useState(false);
  const [form, setForm] = useState({
    email: '', name: '', password: '', passwordConfirmation: '', document: '', date: '', genre: 'Seleccionar',
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

    if (e.target.name === 'password') {
      const reg = new RegExp('^[^@]+@[^@]+\.[a-zA-Z]{2,}$');
      setErrors({ ...errors, email: !reg.test(form.email) });
    }
  };

  const handleSubmit = (e) => {
    console.log(form);

    e.preventDefault();
    setSubmit(true);
    if (errors.empty) {
      document.getElementById('formUserCreate').reset();
      swal('Exito', 'Usuario fue creado con exito', 'success');
    } else
      swal('Error', 'Se produjo un error, por favor verifique los datos', 'warning');

  };

  return (
    <div>
      <p>Bienvenido a K-Mora. Regístrate y sé parte de nuestra tienda online.</p>

      <p><pan className="require">*</pan>Campos Obligatorios</p>
      <form id="formUserCreate" onSubmit={handleSubmit}>
        <label>E-mail<pan className="require">*</pan> </label>
        <input name="email" type="email" placeholder="Ingrese su E-mail..." required onChange={handleInputChange} />
        {submit && errors.email && <pan className="requireMsg">El email ingresado es invalido</pan>}

        <label>Contrseña<pan className="require">*</pan> </label>
        <input name="password" type="password" placeholder="Ingrese su Contrseña..." required minlength="6" onChange={handleInputChange} />

        <label>Confirmar Contraseña<pan className="require">*</pan> </label>
        <input name="passwordConfirmation" type="password" placeholder="Confirme su Contraseña..." required minlength="6" onChange={handleInputChange} />
        {errors.password && <pan className="requireMsg">Las contraseñas no coinciden</pan>}

        <label>Nombre<pan className="require">*</pan></label>
        <input name="name" placeholder="Ingrese su Nombre..." required onChange={handleInputChange} />

        <label>Apellido<span className="require">*</span> </label>
        <input name="lastname" placeholder="Ingrese su Apellido..." required onChange={handleInputChange} />

        <label>DNI<pan className="require">*</pan> </label>
        <input name="document" placeholder="Ingrese su DNI..." required onChange={handleInputChange} />

        <label>Fecha de Nacimiento<pan className="require">*</pan> </label>
        <input name="date" type="date" required onChange={handleInputChange} />

        <label>Género<pan className="require">*</pan></label>
        <select name="genre" onChange={handleInputChange}>
          <option>Seleccionar</option>
          <option>Masculino</option>
          <option>Femenino</option>
          <option>Sin Género</option>
        </select>
        {submit && form.genre === 'Seleccionar' && <pan className="requireMsg">Seleccione un género</pan>}

        <input type="button" value="Regresar" onClick={() => window.history.back()} />
        <input type="submit" value="Resgistrarme" />
      </form>
    </div>
  );
}
