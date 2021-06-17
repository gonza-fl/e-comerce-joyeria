/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { getCategories, getProductDetail } from '../../../redux/actions/actions';
import Button from '../../StyledComponents/Button';

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
        <Button text="Eliminar producto" />
      </div>
    );
  }

  return (
    <div style={{}}>
      <ModifyProduct product={product} categories={categories} />
      <br />
      <Button text="Aceptar" handleClick={() => setModify(!modify)} />
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
          width="300px"
          height="300px"
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

function ModifyProduct({ product, categories }) {
  return (
    <ProductDetail>
      <div>
        <img src={product.images.filter((img, i) => i === 0)[0].url} alt="Not found" width="300px" height="300px" />
      </div>
      <Detail>
        <b>ID: </b>
        <span>{product.id}</span>
        <br />
        <b>Nombre: </b>
        <input value={product.name} />
        <br />
        <b>Precio: </b>
        <input value={product.price} />
        <br />
        <b>Cantidad: </b>
        <input value={product.stockAmount} />
        <br />
        <b>Descripción: </b>
        <br />
        <textarea value={product.description} style={{ fontFamily: 'inherit', width: '100%' }} />
        <br />
        <b>Categorías: </b>
        <div>
          {categories.map((c) => (
            <label>
              <input
                type="checkbox"
                checked={product.categories.map((pc) => pc.name).includes(c.name) ? 'checked' : ''}
              />
              {c.name}
            </label>
          ))}
        </div>
        <br />

      </Detail>
    </ProductDetail>
  );
}

const ProductDetail = styled.div`
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
