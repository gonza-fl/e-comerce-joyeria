/* eslint-disable max-len */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getProductDetail, showFloatingCart } from '../../../redux/actions/actions';
import Button from '../../StyledComponents/Button';
import './Product.css';
import { addToCart } from '../../../utils/cartFunctions';
import ProductReview from './ProductReview/ProductReview';

const Product = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.detail);
  const userId = useSelector((state) => state.user.id);

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

  const handleClickCart = async () => {
    addToCart(detail, userId);
    dispatch(showFloatingCart('inline'));
    setTimeout(() => { dispatch(showFloatingCart('none')); }, 2000);
    window.scrollTo(0, 0);
  };

  return (
    <div className="big-container">
      <div className="product-container">
        <div className="product-img">
          <div className="bigimg-container">
            <img className="bigimg-container-img" src={bigImage} alt={detail.name} />
          </div>

          <div className="container-minpics">
            {
            detail.images.map((image) => <img key={image.url} src={image.url} onClick={(e) => changeImage(e)} alt="" />)
          }
          </div>
        </div>

        <div className="product-info">
          <h1>{detail.name}</h1>
          <div className="divDescuento">
            <h5 className="priceCrossed">
              {detail.discount > 0 ? ` $ ${detail.price}` : null }
            </h5>
            {detail.discount > 0 ? (
              <h2 className="disc">
                {`DESCUENTO DEL %${detail.discount} `}
              </h2>
            ) : null }

          </div>
          <h4>
            $
            {detail.discount > 0 ? (detail.price - (detail.price * detail.discount) / 100).toFixed(2) : detail.price }
          </h4>
          <p className="product-info-description">{detail.description}</p>
          <div className="product-addCart">
            {noStock && <h5 className="last-stock">.toFixed(2)Stock Agotado</h5>}
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
            {detail.stockAmount < 1 ? null : <Button text="AGREGAR AL CARRITO" handleClick={handleClickCart} /> }
          </div>
        </div>
      </div>
      <div className="reviews-container">
        <ProductReview
          productId={productId}
        />
      </div>
    </div>
  );
};

export default Product;
