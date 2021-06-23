/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import swal from 'sweetalert';
import { getCategories, getProductDetail } from '../../../redux/actions/actions';
import { updateProduct } from './utils/request';
import Button from '../../StyledComponents/Button';

function AdminUpdateProduct() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.detail);
  const categories = useSelector((state) => state.categories);

  const [input, setInput] = useState({
    id: 0, name: '', price: 0, stockAmount: 0, categories: [], description: '', images: [{ url: '' }],
  });

  useEffect(() => {
    setInput({
      ...product,
      categories: categories.map((c) => ({ id: c.id, name: c.name, checked: product.categories.map((cat) => cat.id).includes(c.id) ? 'checked' : '' })),
    });
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

    updateProduct({
      ...productUpdated,
      categories: productUpdated.categories.filter((c) => c.checked === 'checked').map((i) => i.id),
    });
  }

  return (
    <Background>
      <ProductDetail method="PUT" onSubmit={(e) => onSubmit(e, input)} className="bg-color-six">
        <Detail>
          <b>ID: </b>
          <span>{product.id}</span>
          <div style={{
            display: 'flex', width: '100%', justifyContent: 'space-around',
          }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', marginRight: '200px' }}>
              <b>NOMBRE: </b>
              <b>PRECIO: </b>
              <b>CANTIDAD: </b>
            </div>
            <div style={{ justifyContent: 'right' }}>
              <StyledInput name="name" value={input.name} onChange={(e) => onChangeInput(e)} />
              <StyledInput name="price" value={input.price} onChange={(e) => onChangeInput(e)} />
              <StyledInput name="stockAmount" value={input.stockAmount} onChange={(e) => onChangeInput(e)} />
            </div>
          </div>
          <b>DESCRIPCIÓN: </b>
          <br />
          <textarea
            name="description"
            value={input.description}
            style={{
              fontFamily: 'inherit',
              width: '100%',
              borderStyle: 'none',
              fontSize: '15px',
              height: '20%',
              resize: 'none',
            }}
            onChange={(e) => onChangeInput(e)}
          />
          <br />
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
          <br />
        </Detail>
        <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '95%' }}>
          {product.images.map((image) => (
            <img
              src={image.url}
              alt="Not found"
              height="200px"
            />
          ))}

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
    font-size: 18px;
`;

const ProductDetail = styled.form`
        position: absolute;
        top: 15%;
        left: 30%;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 5px;
        padding: 10px;
        width: 35%;
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
    font-size: 18px;
    padding: 5px 10px;
`;

export default AdminUpdateProduct;
