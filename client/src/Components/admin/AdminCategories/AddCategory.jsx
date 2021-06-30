/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import swal from 'sweetalert';
import { URL_CATEGORIES } from '../../../constants';
import './AddCategory.css';

function AddCategory() {
  const user = useSelector((state) => state.user);
  const imgInput = useRef();
  const [loading, setLoading] = useState(false);
  const [imgSelected, setImgSelected] = useState('');
  const [input, setInput] = useState({
    name: '',
    description: '',
  });

  function loadingIcon() {
    return (
      <div
        className="lds-facebook"
        style={{
          display: `${loading ? 'block' : 'none'}`,
          position: 'absolute',
          transform: 'translate(220px, 100px)',
        }}
      >
        <div />
        <div />
        <div />
      </div>
    );
  }

  function loadImg() {
    imgInput.current.click();
  }

  function onChangeInput(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  const previewFile = (file) => {
    const reader = new FileReader();
    if (file.size) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (imgSelected.length < 1) {
          setImgSelected(reader.result);
        } else {
          swal('Lo sentimos', 'No puedes agregar más de una imágenes', 'warning');
        }
      };
    }
  };

  const handleImgLoad = (e) => {
    const img = e.target.files[0];
    previewFile(img);
  };

  function closeImg(img) {
    setImgSelected('');
  }

  function addCategory(e) {
    e.preventDefault();
    setLoading(!loading);

    if (!input.name) { setLoading(false); return swal('Lo sentimos', 'Debes incluir un nombre de categoría', 'warning'); }
    if (!input.description) { setLoading(false); return swal('Lo sentimos', 'Debes incluir una descripción de categoría', 'warning'); }
    if (!imgSelected) { setLoading(false); return swal('Lo sentimos', 'Debes incluir una imagen de categoría', 'warning'); }

    axios.post(URL_CATEGORIES,
      {
        name: input.name,
        description: input.description,
        img: imgSelected,
      }, {
        headers: {
          'access-token': user.id,
        },
      })
      .then(() => { setLoading(false); swal('¡Muy bien!', 'Categoría agregada', 'success'); window.location.href = '/admin/controlcategories'; })
      .catch(() => { swal('¡Lo sentimos!', 'No se pudo agregar la categoría', 'warning'); });
  }

  return (
    <div>
      <div className="main-div-add-category" style={{ opacity: `${loading ? 0.7 : 1}` }}>
        {loadingIcon()}
        <form className="form-add-category" onSubmit={addCategory}>
          <b>NOMBRE</b>
          <input name="name" className="inputs-add-category" onChange={onChangeInput} />
          <br />
          <b>DESCRIPCIÓN</b>
          <textarea name="description" className="inputs-add-category" onChange={onChangeInput} />
          <button type="submit" className="button-add-category bg-color-three">AGREGAR CATEGORÍA</button>
        </form>
        <div className="div-image-category">
          <b>IMAGEN</b>
          <button type="button" className="button-add-category bg-color-three" onClick={loadImg}>AGREGAR IMAGEN</button>
          <input
            type="file"
            name="image"
            accept="image/*"
            ref={imgInput}
            style={{ display: 'none' }}
            onChange={handleImgLoad}
          />
          <br />
          {imgSelected ? (
            <div>
              <button type="button" className="close-img-button" onClick={closeImg}>x</button>
              <img
                src={imgSelected}
                alt="Not found"
                height="200px"
                width="200px"
              />
            </div>
          )
            : (
              <div className="noimage-container">
                <b>Agrega una imagen</b>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default AddCategory;
