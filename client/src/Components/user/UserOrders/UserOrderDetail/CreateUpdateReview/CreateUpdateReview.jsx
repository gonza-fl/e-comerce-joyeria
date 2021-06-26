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
import { getProductDetail } from '../../../../../redux/actions/actions';
import { URL_PRODUCTS } from '../../../../../constants';
import Spiner from '../../../../Spiner/Spiner';

const CreateUpdateReview = () => {
  // cuando esté hecha la ruta PUT, descomentar el estado productReview
  // reemplazar todo lo que diga productReviewTest por productReview
  // borrar el los objetos productReviewTest
  // descomentar lo que está abajo del dispatch en el primer useEffect y el segundo useEffect
  // testear

  const { productId, userId } = useParams();
  const [starsValue, setStarsValue] = useState(0);
  const [descriptionValue, setDescriptionValue] = useState('');
  // const [productReview, setProductReview] = useState({});

  const detail = useSelector((state) => state.detail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductDetail(productId));
    // if (detail.id) {
    //   axios.get(`${URL_PRODUCTS}${productId}/review/${userId}`)
    //     .then((response) => {
    //       setProductReview(response.data);
    //     })
    //     .catch((err) => swal('Error', err.response.data, 'warning'));
    // }
  }, []);

  // useEffect(() => {
  //   if (Object.keys(productReview).length) {
  //     setStarsValue(productReview.calification);
  //     setDescriptionValue(productReview.description);
  //   }
  // }, [productReview]);

  const changeStars = (e) => {
    if (typeof e === 'number') {
      setStarsValue(e);
    }
  };

  const changeDescription = (e) => {
    setDescriptionValue(e.target.value);
  };

  const productReviewTest = {};
  // const productReviewTest = {
  //   id: 1,
  //   calification: 3,
  //   description: 'Hakuna matata una forma de ser. Wakanda foreva',
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const sendReview = { calification: starsValue, description: descriptionValue, userId };
    if (!Object.keys(productReviewTest).length) {
      return axios.post(`${URL_PRODUCTS}${productId}/review`, sendReview)
        .then((response) => swal('Success', response.data, 'success'))
        .then(() => { window.location.href = `${window.location.origin}/account/profile`; })
        .catch((err) => swal('Error', err.response.data, 'warning'));
    }
    return axios.put(`${URL_PRODUCTS}${productId}/review/${productReviewTest.id}`, sendReview)
      .then((response) => swal('Success', response.data, 'success'))
      .then(() => { window.location.href = `${window.location.origin}/account/profile`; })
      .catch((err) => swal('Error', err.response.data, 'warning'));
  };

  const deleteReview = () => {
    axios.delete(`${URL_PRODUCTS}${productId}/review/${productReviewTest.id}`)
      .then((response) => swal('Success', response.data, 'success'))
      .then(() => { window.location.href = `${window.location.origin}/account/profile`; })
      .catch((err) => swal('Error', err.response.data, 'warning'));
  };

  if (detail.id) {
    return (
      <div>
        <p>Dejanos tu review!</p>
        <div>
          <p>{detail.name}</p>
          <div>
            <img src={detail.images[0].url} alt={detail.name} width="100px" />
            <form method="POST" onSubmit={(e) => handleSubmit(e)}>
              <div>
                <p>¿Cuántas estrellas le darías?</p>
                <ReactStars
                  count={5}
                  size={24}
                  value={starsValue}
                  onChange={changeStars}
                  activeColor="#ffd700"
                />
              </div>
              <div>
                <p>Contanos cuál es tu opinión del producto</p>
                <textarea
                  value={descriptionValue}
                  onChange={changeDescription}
                >
                </textarea>
              </div>
              <button type="submit">Enviar opinión</button>
              {Object.keys(productReviewTest).length
                ? <button onClick={deleteReview}>Eliminar Review</button>
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
