/* eslint-disable consistent-return */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable max-len */
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
  const user = useSelector((state) => state.user);
  useEffect(() => {
    setProductsDisplay(products);
  }, [products]);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
  }, []);

  function onSearch(e) {
    setProductsDisplay(productsDisplay.filter((p) => p.name.toLowerCase().includes(e.target.value.toLowerCase())));
    if (e.target.value === '') {
      setProductsDisplay(products);
    }
  }

  function onFilterCategories(e) {
    if (e.target.value === 'allCategories') {
      return setProductsDisplay(products);
    }

    for (let i = 0; i < categories.length; i++) {
      if (categories[i].id === parseFloat(e.target.value)) {
        setProductsDisplay(products.filter((p) => p.categories.map((c) => c.id).includes(categories[i].id)));
      }
    }
  }

  function onFilterStockAmount(e) {
    if (e.target.value === 'other') {
      return setProductsDisplay([...productsDisplay.sort((a, b) => ((a.id > b.id) ? 1 : -1))]);
    }

    if (e.target.value === 'max') {
      return setProductsDisplay([...productsDisplay.sort((a, b) => ((a.stockAmount < b.stockAmount) ? 1 : -1))]);
    }

    return setProductsDisplay([...productsDisplay.sort((a, b) => ((a.stockAmount > b.stockAmount) ? 1 : -1))]);
  }

  function onFilterPrice(e) {
    if (e.target.value === 'other') {
      return setProductsDisplay([...productsDisplay.sort((a, b) => ((a.id > b.id) ? 1 : -1))]);
    }

    if (e.target.value === 'max') {
      return setProductsDisplay([...productsDisplay.sort((a, b) => ((a.price < b.price) ? 1 : -1))]);
    }

    return setProductsDisplay([...productsDisplay.sort((a, b) => ((a.price > b.price) ? 1 : -1))]);
  }

  return (
    <WindowContainer>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '10px' }}>
        <b>Por categoría</b>
        <Select onChange={onFilterCategories}>
          <option value="allCategories">Todas las categorías</option>
          {categories.map((c) => <option value={c.id}>{c.name}</option>)}
        </Select>

        <b>Por cantidad</b>
        <Select onChange={onFilterStockAmount}>
          <option value="other">Filtra por cantidad</option>
          <option value="max">Por mayor cantidad</option>
          <option value="min">Por menor cantidad</option>
        </Select>

        <b>Por precio</b>
        <Select onChange={onFilterPrice}>
          <option value="other">Filtra por precio</option>
          <option value="max">Por mayor precio</option>
          <option value="min">Por menor precio</option>
        </Select>

        <div>
          <Input name="name" placeholder="Busca por nombre" onChange={onSearch} />
          &nbsp;&nbsp;
          <FaSearch />
        </div>
      </div>
      <DivContainer style={{ overflowY: 'scroll' }}>
        <table>
          <tr>
            <th>ID</th>
            <th>NOMBRE</th>
            <th>PRECIO</th>
            <th>DESCUENTO</th>
            <th>CANTIDAD</th>
            <th>CATEGORIAS</th>
            <th>IMAGEN</th>
          </tr>
          {productsDisplay.map((p) => (

            <ProductContainer className="bg-color-three" key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.discount > 0 ? `${p.discount}%` : '-'}</td>
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
                <button type="button" onClick={() => deleteProduct(p, user.id)}>X</button>
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

const Select = styled.select`
        border-style: none;
        padding: 2px 10px;
        font-size: 15px;
        font-family: inherit;
`;

const Input = styled.input`
      border-style: none;
      font-size: 15px;
      padding: 5px 10px;
      border-radius: 5px;
`;

export default AdminProducts;
