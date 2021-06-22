/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import swal from 'sweetalert';
import { getCategories } from '../../../redux/actions/actions';
import { createProduct } from '../AdminProducts/utils/request';
import './AdminCreateProduct.css';

function AdminCreateProduct() {
  const dispatch = useDispatch();
  const [previewImg, setPreviewImg] = useState([]);
  const categories = useSelector((state) => state.categories);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    name: '',
    price: '',
    stockAmount: '',
    description: '',
    images: [],
    categories: [],
  });

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  function loadingIcon() {
    return (
      <div
        className="lds-facebook"
        style={{
          display: `${loading ? 'inline' : 'none'}`,
          position: 'absolute',
          top: '60',
          left: '50',
          transform: 'translate(-20px, 100px)',
        }}
      >
        <div />
        <div />
        <div />
      </div>
    );
  }

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (previewImg.length < 3) {
        setPreviewImg([...previewImg, reader.result]);
      } else {
        swal('No puedes agregar más de tres imágenes');
      }
    };
  };

  const handleImgLoad = (e) => {
    const img = e.target.files[0];
    previewFile(img);
  };

  function closeImg(img) {
    setPreviewImg(previewImg.filter((i) => i !== img));
  }

  function onChangeInput(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function onChangeCategories(e) {
    if (input.categories.includes(e.target.value)) {
      setInput({
        ...input,
        categories: input.categories.filter((c) => c !== e.target.value),
      });
    } else {
      setInput({
        ...input,
        categories: [...input.categories, e.target.value],
      });
    }
  }

  function onSubmitProduct(e) {
    setLoading(true);
    e.preventDefault();

    if (!input.name) { setLoading(false); return swal('Error', 'Debes completar el campo Nombre', 'warning'); }

    if (!input.price) { setLoading(false); return swal('Error', 'Debes completar el campo Precio', 'warning'); }

    if (!input.stockAmount) { setLoading(false); return swal('Error', 'Debes completar el campo Número de unidades', 'warning'); }

    if (!input.description) { setLoading(false); return swal('Error', 'Debes completar el campo Descripción', 'warning'); }

    if (previewImg.length === 0) { setLoading(false); return swal('Error', 'Debes agregar al menos una imagen', 'warning'); }

    if (input.categories.length === 0) { setLoading(false); return swal('Error', 'Debes asignar al menos una categoría', 'warning'); }

    return createProduct({ ...input, image: previewImg }, setLoading);
  }

  return (
    <div style={{
      position: 'absolute', top: 60, left: 50, transform: 'translate(0px, 100px)',
    }}
    >
      {loadingIcon()}
      <CreateProduct className="bg-color-three" method="POST" onSubmit={onSubmitProduct}>
        <div style={{ display: 'flex' }}>
          <Detail>
            <div style={{ display: 'flex' }}>
              <div style={{ textAlign: 'left' }}>
                <b>Nombre* &ensp;&ensp;</b>
                <br />
                <b>Precio* &ensp;&ensp;</b>
                <br />
                <b>Número de unidades* &ensp;&ensp;</b>
                <br />
              </div>
              <div style={{ textAlign: 'right', justifyContent: 'right' }}>
                <input name="name" onChange={onChangeInput} />
                <br />
                <input name="price" onChange={onChangeInput} />
                <br />
                <input name="stockAmount" onChange={onChangeInput} />
                <br />
              </div>
            </div>
            <br />
            <b>Descripción* &ensp;&ensp;</b>
            <br />
            <br />
            <textarea name="description" style={{ height: '100px', width: '300px', fontFamily: 'inherit' }} onChange={onChangeInput} />
          </Detail>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <b>{`Agregar una imagen   ${previewImg.length}/3`}</b>
            <br />
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImgLoad}
            />
            <br />
            <div style={{ display: 'flex', width: '350px' }}>
              {previewImg.map((i) => (
                <div>
                  <img src={i} alt="Not found" width="100px" height="100px" style={{ padding: '5px' }} />
                  <CloseButton type="button" onClick={() => closeImg(i)}>X</CloseButton>
                </div>
              ))}
            </div>
          </div>
          <div>
            <b>Agregar una categoría</b>
            <br />
            <br />
            <DivCategories>
              {categories.map((c) => (
                <label>
                  <input type="checkbox" name="categories" value={c.id} onClick={onChangeCategories} />
                  {c.name}
                </label>
              ))}
            </DivCategories>
          </div>
        </div>
        <button type="submit">Crear producto</button>
      </CreateProduct>
    </div>
  );
}

const CreateProduct = styled.form` 
    display: flex;
    flex-direction: column;
    padding: 10px;
`;

const Detail = styled.div`
    padding: 10px;
`;

const CloseButton = styled.button`
    position: absolute;
    transform: translate(-25px,5px);
    border-style: none;
    background: transparent;

    &:hover {
      cursor: pointer;
    }
`;

const DivCategories = styled.div`
      display: flex;
      flex-direction: column;
      overflow-y: scroll;
      border-block-style: solid;
      height: 210px;
`;

export default AdminCreateProduct;
