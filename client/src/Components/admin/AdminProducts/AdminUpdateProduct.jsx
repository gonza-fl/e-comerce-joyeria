/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import swal from 'sweetalert';
import { getCategories, getProductDetail } from '../../../redux/actions/actions';
import { updateProduct } from './utils/request';
import Button from '../../StyledComponents/Button';
import './AdminUpdateProduct.css';

function AdminUpdateProduct() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.detail);
  const categories = useSelector((state) => state.categories);
  const imgInput = useRef();
  const user = useSelector((state) => state.user);
  const [input, setInput] = useState({
    id: 0, name: '', price: 0, stockAmount: 0, categories: [], description: '', images: [{ url: '' }], discount: 0,
  });

  const [imgSelected, setImgSelected] = useState([{ url: '' }]);

  useEffect(() => {
    setInput({
      ...product,
      categories: categories.map((c) => ({ id: c.id, name: c.name, checked: product.categories.map((cat) => cat.id).includes(c.id) ? 'checked' : '' })),
    });
    setImgSelected(product.images);
  }, [product]);

  useEffect(() => {
    dispatch(getProductDetail(productId));
    dispatch(getCategories());
  }, []);

  function onChangeInput(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function onChangeCategories(e) {
    if (input.categories.find((c) => c.id === parseFloat(e.target.value)).checked === 'checked') {
      setInput({
        ...input,
        categories: input.categories.map((c) => ({ id: c.id, name: c.name, checked: c.id === parseFloat(e.target.value) ? '' : c.checked })),
      });
    } else {
      setInput({
        ...input,
        categories: input.categories.map((c) => ({ id: c.id, name: c.name, checked: c.id === parseFloat(e.target.value) ? 'checked' : c.checked })),
      });
    }
  }

  function onSubmit(e, productUpdated) {
    e.preventDefault();
    if (!input.categories.filter((c) => c.checked === 'checked')[0]) { return swal('Error', 'Debes asignar al menos una categoría', 'warning'); }
    if (input.discount > 100 || input.discount < 0 || typeof parseInt(input.discount, 10) !== 'number') { return swal('Error', 'El descuento debe ser entre 0 y 100', 'warning'); }
    if (input.price < 0 || typeof parseInt(input.price, 10) !== 'number') { return swal('Error', 'El precio no puede ser negativo y debe ser numerico', 'warning'); }
    updateProduct({
      ...productUpdated,
      categories: productUpdated.categories.filter((c) => c.checked === 'checked').map((i) => i.id),
      images: imgSelected,
    }, user.id);
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
      <ProductDetail method="PUT" onSubmit={(e) => onSubmit(e, input)} className="bg-color-six">
        <Detail>
          <div className="input-general-container ">
            <div className="input-name-container ">
              <b>ID: </b>
              <b>NOMBRE: </b>
              <b>PRECIO: </b>
              <b>CANTIDAD: </b>
              <b>DISCOUNT%:</b>
            </div>
            <div className="input-name-container ">
              <span>{product.id}</span>
              <StyledInput name="name" value={input.name} onChange={(e) => onChangeInput(e)} />
              <StyledInput type="number" name="price" value={input.price} onChange={(e) => onChangeInput(e)} />
              <StyledInput name="stockAmount" value={input.stockAmount} onChange={(e) => onChangeInput(e)} />
              <StyledInput type="number" name="discount" value={input.discount} onChange={(e) => onChangeInput(e)} />
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
              {input.categories.map((c) => (
                <label>
                  <StyledInput
                    onChange={(e) => onChangeCategories(e)}
                    name="categories"
                    type="checkbox"
                    value={c.id}
                    checked={c.checked}
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
          <Button type="submit" text="Aplicar cambios" className="bg-color-three" />
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

export default AdminUpdateProduct;
