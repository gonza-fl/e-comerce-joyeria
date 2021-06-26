/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import styled from 'styled-components';
import { getCategories, getProducts } from '../../../redux/actions/actions';
import { deleteProduct } from './utils/request';
import loadingImg from '../../../img/loading-img.jpg';
import Button from '../../StyledComponents/Button';

function AdminProducts() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const categories = useSelector((state) => state.categories);
  const [productsDisplay, setProductsDisplay] = useState([]);

  useEffect(() => {
    setProductsDisplay(products);
  }, [products]);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
  }, []);

  // function onFilter(e) {
  //   switch (e.target.value) {
  //     case ''

  //     default: 'none';
  //   }
  // }

  return (
    <WindowContainer>
      <div>
        <span>Por categoría</span>
        <select>
          {categories.map((c) => <option>{c.name}</option>)}
        </select>

        <span>Por cantidad</span>
        <select>
          <option>Por mayor cantidad</option>
          <option>Por menor cantidad</option>
        </select>

        <span>Por precio</span>
        <select>
          <option>Por mayor precio</option>
          <option>Por menor precio</option>
        </select>

        <input name="name" />
        <FaSearch />
      </div>
      <DivContainer style={{ overflowY: 'scroll' }}>
        <table>
          <tr>
            <th>ID</th>
            <th>NOMBRE</th>
            <th>PRECIO</th>
            <th>CANTIDAD</th>
            <th>CATEGORIAS</th>
            <th>IMAGEN</th>
          </tr>
          {productsDisplay.map((p) => (

            <ProductContainer className="bg-color-three" key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.stockAmount}</td>
              <td>{p.categories.map((c) => <li key={c.name}>{c.name}</li>)}</td>
              <td>
                <img src={p.images.filter((img, i) => i === 0)[0].url || loadingImg} alt="Not found" height="50px" width="50px" />
              </td>
              <td>
                <Link to={`/admin/products/edit/${p.id}`} className="link-without-styles">
                  <button type="button">Editar</button>
                </Link>
              </td>
              <td>
                <button type="button" onClick={() => deleteProduct(p)}>X</button>
              </td>
            </ProductContainer>

          ))}
        </table>

      </DivContainer>
      <Link to="/admin/products/create"><Button text="Agregar nuevo producto" /></Link>
    </WindowContainer>
  );
}

const WindowContainer = styled.div`
        display: flex;
        flex-direction: column;
        height: 90%;
        width: 90%;
        border-style: solid;
        padding: 10px 20px;
`;

const DivContainer = styled.div`
        display: flex;
        flex-direction: column;
        height: 95%;
        padding: 10px 20px;
`;

const ProductContainer = styled.tr`
        border-style: solid;
        border-radius: 5px;
        align-items: center;
      
        &:hover {

        }
`;

export default AdminProducts;
