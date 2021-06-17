/* eslint-disable react/prop-types */
/* eslint linebreak-style: ["error", "windows"] */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getProducts } from '../../../redux/actions/actions';

function AdminProducts() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <DivContainer>
      <table>
        <tr>
          <th>ID</th>
          <th>NOMBRE</th>
          <th>PRECIO</th>
          <th>CANTIDAD</th>
          <th>CATEGORIAS</th>
          <th>IMAGEN</th>
        </tr>
        {products.map((p) => (
          <ProductContainer className="bg-color-three">
            <Link to={`/admin/products/${p.id}`} className="link-without-styles">
              <td>{p.id}</td>
            </Link>
            <td>{p.name}</td>
            <td>{p.price}</td>
            <td>{p.stockAmount}</td>
            <td>{p.categories.map((c) => <li>{c.name}</li>)}</td>
            <img src={p.images.filter((img, i) => i === 0)[0].url} alt="Not found" height="50px" width="50px" />
          </ProductContainer>
        ))}
      </table>

    </DivContainer>
  );
}

const DivContainer = styled.div`
        display: flex;
        flex-direction: column;
        height: 90%;
        width: 90%;
        border-style: solid;
        padding: 10px 20px;
`;

const ProductContainer = styled.tr`
        border-style: solid;
        border-radius: 5px;

        &:hover {
            cursor: pointer;
            transform: scale(1.01);
            color: white;
        }
`;

export default AdminProducts;
