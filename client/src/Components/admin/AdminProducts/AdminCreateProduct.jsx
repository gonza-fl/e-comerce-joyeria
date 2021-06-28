/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import swal from 'sweetalert';
import { getCategories } from '../../../redux/actions/actions';
import { createProduct } from './utils/request';
import Button from '../../StyledComponents/Button';
import './AdminCreateProduct.css';

function AdminCreateProduct() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const imgInput = useRef();
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    id: 0, name: '', price: 0, stockAmount: 0, categories: [], description: '',
  });
  const user = useSelector((state) => state.user);
  const [imgSelected, setImgSelected] = useState([]);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  function loadingIcon() {
    return (
      <div
        className="lds-facebook"
        style={{
          display: `${loading ? 'block' : 'none'}`,
          position: 'absolute',
          top: 150,
        }}
      >
        <div />
        <div />
        <div />
      </div>
    );
  }

  function onChangeInput(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function onChangeCategories(e) {
    if (input.categories.find((c) => c.id === parseFloat(e.target.value))) {
      setInput({
        ...input,
        categories: input.categories.filter((c) => c.id !== e.target.value),
      });
    } else {
      setInput({
        ...input,
        categories: [...input.categories, e.target.value],
      });
    }
  }

  function onSubmit(e) {
    setLoading(true);
    e.preventDefault();

    if (!input.name) { setLoading(false); return swal('Error', 'Debes completar el campo Nombre', 'warning'); }

    if (!input.price) { setLoading(false); return swal('Error', 'Debes completar el campo Precio', 'warning'); }
    if (Number.isNaN(input.price)) { setLoading(false); return swal('Error', 'El precio debe ser un número', 'warning'); }
    if (input.price < 0) { setLoading(false); return swal('Error', 'El precio debe ser mayor a cero', 'warning'); }

    if (!input.stockAmount) { setLoading(false); return swal('Error', 'Debes completar el campo Número de stock', 'warning'); }
    if (Number.isNaN(input.stockAmount)) { setLoading(false); return swal('Error', 'El stock debe ser un número', 'warning'); }
    if (input.stockAmount < 0) { setLoading(false); return swal('Error', 'El stock debe ser mayor a cero', 'warning'); }

    if (!input.description) { setLoading(false); return swal('Error', 'Debes completar el campo Descripción', 'warning'); }

    if (imgSelected.length === 0) { setLoading(false); return swal('Error', 'Debes agregar al menos una imagen', 'warning'); }

    if (input.categories.length === 0) { setLoading(false); return swal('Error', 'Debes asignar al menos una categoría', 'warning'); }

    return createProduct({ ...input, image: imgSelected }, setLoading, user.id);
  }

  const previewFile = (file) => {
    const reader = new FileReader();
    if (file.size) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (imgSelected.length < 3) {
          setImgSelected([...imgSelected, reader.result]);
        } else {
          swal('Lo sentimos', 'No puedes agregar más de tres imágenes', 'warning');
        }
      };
    }
  };

  const handleImgLoad = (e) => {
    const img = e.target.files[0];
    previewFile(img);
  };

  function loadImg() {
    imgInput.current.click();
  }

  function closeImg(img) {
    setImgSelected(imgSelected.filter((i) => i !== img || i.url !== img.url));
  }

  return (
    <Background>
      <ProductDetail method="PUT" onSubmit={(e) => onSubmit(e)} className="bg-color-six" style={{ opacity: `${loading ? 0.7 : 1}` }}>
        {loadingIcon()}
        <Detail>
          <div className="input-general-container ">
            <div className="input-name-container ">
              <b>NOMBRE: </b>
              <b>PRECIO: </b>
              <b>CANTIDAD: </b>
            </div>
            <div className="input-name-container ">
              <StyledInput name="name" value={input.name} onChange={(e) => onChangeInput(e)} />
              <StyledInput name="price" value={input.price} onChange={(e) => onChangeInput(e)} />
              <StyledInput name="stockAmount" value={input.stockAmount} onChange={(e) => onChangeInput(e)} />
            </div>
            <div className="description-container">
              <b>DESCRIPCIÓN: </b>
              <br />
              <textarea
                name="description"
                value={input.description}
                onChange={(e) => onChangeInput(e)}
              />
            </div>
          </div>
          <div>
            <b>CATEGORÍAS: </b>
            <div>
              {categories.map((c) => (
                <label style={{ marginRight: '10px' }}>
                  <StyledInput
                    onChange={(e) => onChangeCategories(e)}
                    name="categories"
                    type="checkbox"
                    value={c.id}
                  />
                  {c.name}
                </label>
              ))}
            </div>
          </div>
        </Detail>
        <input
          type="file"
          name="image"
          accept="image/*"
          style={{ display: 'none' }}
          ref={imgInput}
          onChange={handleImgLoad}
        />
        <Button type="button" text="Carga una imagen" className="bg-color-three" handleClick={loadImg} />
        <br />
        <div className="input-images-container">
          {imgSelected.length > 0 ? imgSelected.map((image) => (
            <div>
              <button type="button" className="close-image-button" onClick={() => closeImg(image)}>x</button>
              <img
                src={image.url || image}
                alt="Not found"
                height="150px"
              />
            </div>
          )) : <div><h2>No tienes imágenes agregadas</h2></div>}

        </div>
        <br />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button type="submit" text="Crear producto" className="bg-color-three" />
        &ensp;
          <Link to="/admin/products"><Button type="button" text="Cancelar" /></Link>
        </div>
      </ProductDetail>
    </Background>
  );
}

const Background = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.4); 
    height: 100%;
    width: 100%;
    font-size: 16px;
`;

const ProductDetail = styled.form`
        position: absolute;
        top: 10%;
        left: 30%;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 5px;
        padding: 10px;
        flex-wrap: nowrap;
`;

const Detail = styled.div`
      width: 80%;
      text-align: left;
      padding: 10px 20px;
      line-height: 2em;
`;

const StyledInput = styled.input` 
    border-style: none;
    border-radius: 5px;
    font-size: 16px;
    padding: 5px 10px;
`;

export default AdminCreateProduct;
