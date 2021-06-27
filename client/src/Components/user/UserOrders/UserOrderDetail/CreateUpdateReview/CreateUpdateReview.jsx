/* eslint-disable react/button-has-type */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-boolean-value */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import ReactStars from 'react-rating-stars-component';
import axios from 'axios';
import { getProductDetail, getReviewByUser, resetProductDetailAndReview } from '../../../../../redux/actions/actions';
import { URL_PRODUCTS } from '../../../../../constants';
import Spiner from '../../../../Spiner/Spiner';
import './CreateUpdateReview.css';

const CreateUpdateReview = () => {
  const { productId, userId } = useParams();
  const [starsValue, setStarsValue] = useState(0);
  const [descriptionValue, setDescriptionValue] = useState('');

  const detail = useSelector((state) => state.detail);
  const productReview = useSelector((state) => state.reviewByUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetProductDetailAndReview());
    dispatch(getReviewByUser(productId, userId));
    dispatch(getProductDetail(productId));
  }, [dispatch]);

  useEffect(() => {
    if (Object.keys(productReview).length && productReview.productId === parseInt(productId, 10)) {
      setStarsValue(productReview.calification);
      setDescriptionValue(productReview.description);
    }
  }, [productReview]);

  const changeStars = (e) => {
    if (typeof e === 'number') {
      setStarsValue(e);
    }
  };

  const changeDescription = (e) => {
    setDescriptionValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const sendReview = { calification: starsValue, description: descriptionValue, userId };
    if (!Object.keys(productReview).length) {
      return axios.post(`${URL_PRODUCTS}${productId}/review`, sendReview)
        .then((response) => swal('Success', response.data, 'success'))
        .then(() => { window.location.href = `${window.location.origin}/account/profile`; })
        .catch((err) => swal('Error', err.response.data, 'warning'));
    }
    return axios.put(`${URL_PRODUCTS}${productId}/review/${productReview.id}`, sendReview)
      .then((response) => swal('Success', response.data, 'success'))
      .then(() => { window.location.href = `${window.location.origin}/account/profile`; })
      .catch((err) => swal('Error', err.response.data, 'warning'));
  };

  const deleteReview = () => {
    axios.delete(`${URL_PRODUCTS}${productId}/review/${productReview.id}`)
      .then((response) => swal('Success', response.data, 'success'))
      .then(() => { window.location.href = `${window.location.origin}/account/profile`; })
      .catch((err) => swal('Error', err.response.data, 'warning'));
  };

  if (detail.id) {
    return (
      <div className="reviews-big-container">
        <p className="reviews-big-container-title">Dejanos tu opinión!</p>
        <div className="review-container">
          <p className="review-container-title">{detail.name}</p>
          <div className="review-container-flex">
            <img className="review-container-img" src={detail.images[0].url} alt={detail.name} width="100px" />
            <form className="review-form" method="POST" onSubmit={(e) => handleSubmit(e)}>
              <div className="review-stars-container">
                <p className="review-form-title">¿Cuántas estrellas le darías?</p>
                <ReactStars
                  count={5}
                  size={24}
                  value={starsValue}
                  onChange={changeStars}
                  activeColor="#ffd700"
                />
              </div>
              <div className="review-description-container">
                <p className="review-form-title">Contanos cuál es tu opinión del producto</p>
                <textarea
                  className="review-description"
                  rows="5"
                  cols="50"
                  value={descriptionValue}
                  onChange={changeDescription}
                >
                </textarea>
              </div>
              <button className="send-review-btn" type="submit">Enviar opinión</button>
              {Object.keys(productReview).length
                ? <button className="send-review-btn" onClick={deleteReview}>Eliminar opinión</button>
                : null}
            </form>
          </div>
        </div>
      </div>
    );
  }
  return (
    <Spiner msg="No se encontró el producto" />
  );
};

export default CreateUpdateReview;
