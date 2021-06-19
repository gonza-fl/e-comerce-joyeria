/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint linebreak-style: ["error", "windows"] */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { getCategories, getProductDetail } from '../../../redux/actions/actions';
import Button from '../../StyledComponents/Button';
import { deleteProduct, sendChanges } from './utils/request';

function AdminProductCard() {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.detail);
  const categories = useSelector((state) => state.categories);
  const { productId } = useParams();
  const [modify, setModify] = useState(false);

  useEffect(() => {
    dispatch(getProductDetail(productId));
    dispatch(getCategories());
  }, []);

  if (!modify) {
    return (
      <div style={{}}>
        <ShowProduct product={product} />
        <br />
        <Button text="Modificar producto" handleClick={() => setModify(!modify)} />
        &ensp;
        <a href="/admin/products" className="link-without-styles">
          <Button text="Eliminar producto" handleClick={() => deleteProduct(product)} />
        </a>
      </div>
    );
  }

  return (
    <div style={{}}>
      <ModifyProduct
        product={product}
        categories={categories}
        modify={modify}
        setModify={setModify}
      />
    </div>
  );
}

function ShowProduct({ product }) {
  return (
    <ProductDetail>
      <div>
        <img
          src={product.images.filter((img, i) => i === 0)[0].url}
          alt="Not found"
          width="350px"
          height="350px"
        />
      </div>
      <Detail>
        <b>ID: </b>
        <span>{product.id}</span>
        <br />
        <b>Nombre: </b>
        <span>{product.name}</span>
        <br />
        <b>Precio: </b>
        <span>{product.price}</span>
        <br />
        <b>Cantidad: </b>
        <span>{product.stockAmount}</span>
        <br />
        <b>Descripción: </b>
        <span>{product.description}</span>
        <br />
        <b>Categorías: </b>
        {product.categories.map((c) => (
          <span>
            {c.name}
            {' '}
          </span>
        ))}
      </Detail>
      <Link to="/admin/products"><CloseButton className="bg-color-three">X</CloseButton></Link>
    </ProductDetail>
  );
}

function ModifyProduct({
  product, categories, modify, setModify,
}) {
  const [input, setInput] = useState({
    id: product.id,
    name: product.name,
    price: product.price,
    stockAmount: product.stockAmount,
    description: product.description,
    categories: product.categories,
  });

  function onChangeInput(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <ProductDetail method="PUT" onSubmit={() => sendChanges(input)}>
      <div>
        <img
          src={product.images.filter((img, i) => i === 0)[0].url}
          alt="Not found"
          width="350px"
          height="350px"
        />
      </div>
      <Detail>
        <b>ID: </b>
        <span>{product.id}</span>
        <br />
        <b>Nombre: </b>
        <input name="name" value={input.name} onChange={(e) => onChangeInput(e)} />
        <br />
        <b>Precio: </b>
        <input name="price" value={input.price} onChange={(e) => onChangeInput(e)} />
        <br />
        <b>Cantidad: </b>
        <input name="stockAmount" value={input.stockAmount} onChange={(e) => onChangeInput(e)} />
        <br />
        <b>Descripción: </b>
        <br />
        <textarea
          name="description"
          value={input.description}
          style={{ fontFamily: 'inherit', width: '100%' }}
          onChange={(e) => onChangeInput(e)}
        />
        <br />
        <b>Categorías: </b>
        <div>
          {categories.map((c) => (
            <label>
              <input
                onChange={(e) => onChangeInput(e)}
                name="categories"
                type="checkbox"
                checked={input.categories.map((pc) => pc.name).includes(c.name) ? 'checked' : ''}
              />
              {c.name}
            </label>
          ))}
        </div>
        <br />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button type="submit" text="&#x2713;" />
        &ensp;
          <Button type="button" text="X" handleClick={() => setModify(!modify)} />
        </div>
      </Detail>
    </ProductDetail>
  );
}

const ProductDetail = styled.form`
        display: flex;
        align-items: center;
        border-style: solid;
        border-radius: 5px;
`;

const Detail = styled.div`
      width: 300px;
      text-align: left;
      padding: 10px 20px;
      line-height: 2em;
`;

const CloseButton = styled.button`
      position: absolute;
      border-style: none;
      transform: translate(-25px,-150px);

      &:hover {
        cursor: pointer;
        color:white;
      }
`;

export default AdminProductCard;
