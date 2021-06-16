/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';
import { getProductDetail } from '../../../redux/actions/actions';
import Button from '../../StyledComponents/Button';
import ModalModifyProduct from '../../admin/ModifyProduct/ModalModifyProduct/ModalModifyProduct';
import './Product.css';

const { REACT_APP_API } = process.env;

const Product = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.detail);

  const [bigImage, setBigImage] = useState('');

  useEffect(() => {
    dispatch(getProductDetail(productId));
  }, []);
  useEffect(() => {
    if (detail.images.length !== 0)setBigImage(detail.images[0].url);
  }, [detail]);

  const changeImage = (e) => {
    setBigImage(e.target.src);
  };

  let noStock = false;
  let lowStock = false;
  if (detail && detail.stockAmount === 0) {
    noStock = true;
  } else if (detail && detail.stockAmount < 5) {
    lowStock = true;
  }

  const handleDelete = (e) => {
    e.preventDefault();
    swal({
      title: 'Estas seguro?',
      text: 'Al aceptar este producto desaparecera del catalogo!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          axios.delete(`${REACT_APP_API}api/products/${detail.id}`);
          swal('Producto eliminado!', {
            icon: 'success',
          });
        } else {
          swal('cancel');
        }
      });
  };

  return (
    <div className="product-container">
      <div className="product-img">
        <div className="bigimg-container">
          <img src={bigImage} alt={detail.name} />
        </div>

        <div className="container-minpics">
          {
            detail.images.map((image) => <img src={image.url} onClick={(e) => changeImage(e)} alt="" />)
          }
        </div>
      </div>

      <div className="product-info">
        <h1>{detail.name}</h1>
        <h4>
          $
          {detail.price}
        </h4>
        <p className="product-info-description">{detail.description}</p>
        {/* <h4>Rating: {detail.rating || '5'}</h4>   */}
        <div className="product-addCart">
          {noStock && <h5 className="last-stock">Stock Agotado</h5>}
          {lowStock && (
          <h5 className="last-stock">
            Ultimas
            {' '}
            {detail.stockAmount}
            {' '}
            unidades!!
          </h5>
          )}
          {!lowStock && !noStock && (
          <h5>
            Stock:
            {' '}
            {detail.stockAmount}
            {' '}
            unidades
          </h5>
          )}

          {/* botón para agregar al carrito:
          le falta la prop handleClick que le debería pasar la accion de agregar al carrito.
          Para los usuarios debería guardarlo en la tabla de orden de compra,
          y para los invitados debería guardarlo en el local storage */}
          {noStock ? null : <Button text="AGREGAR AL CARRITO" /> }
        </div>
        <ModalModifyProduct id={detail.id} />
        <span><button onClick={(e) => handleDelete(e)}>Eliminar Producto</button></span>
      </div>
    </div>
  );
};

export default Product;
