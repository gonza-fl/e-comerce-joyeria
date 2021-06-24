/* eslint-disable react/jsx-max-props-per-line */
/* eslint-disable react/jsx-props-no-multi-spaces */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import ReactStars from 'react-rating-stars-component';
import axios from 'axios';
import swal from 'sweetalert';
import { URL_PRODUCTS } from '../../../../constants';
import './ProductReview.css';

const ProductReview = ({ productId }) => {
  const [review, setReview] = useState([]);

  useEffect(() => {
    axios.get(`${URL_PRODUCTS}${productId}/review`)
      .then((response) => {
        setReview(response.data);
      })
      .catch((err) => swal('Error', err.response.data, 'warning'));
  }, []);

  const average = review.map((rev) => rev.calification).reduce((a, b) => a + b, 0) / review.length;
  const roundAverage = average.toFixed(1);

  return (
    <div className="product-reviews-container">
      <h2 id="product-reviews-container-title">Opiniones sobre el producto</h2>
      <div className="average-review">
        <p id="average-number">{roundAverage}</p>
        <div className="average-review-stars">
          <ReactStars
            count={5}
            size={24}
            edit={false}
            value={Math.round(average)}
            activeColor="#ffd700"
          />
          <p id="average-declaration">Promedio entre {review.length} opiniones</p>
        </div>
      </div>
      <div className="description-reviews-container">
        {review.map((rev) => (
          <div className="description-review">
            <ReactStars
              count={5}
              size={24}
              edit={false}
              value={rev.calification}
              activeColor="#ffd700"
            />
            <p id="description-review-description">{rev.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReview;
