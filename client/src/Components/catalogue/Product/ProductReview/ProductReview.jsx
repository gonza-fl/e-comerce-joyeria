/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
// import axios from 'axios';
// import { URL_GET_REVIEWS } from '../../../../constants';

const ProductReview = ({ productId }) => {
  // const [review, setReview] = useState([]);

  // useEffect(() => {
  //   axios.get(`${URL_GET_REVIEWS}${productId}/review`)
  //     .then((response) => {
  //       setReview(response.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  // la idea es recibir un array con objetos (cada objeto va a ser una review).
  const reviewTest = [{
    id: 1, userId: 1, productId: 1, calification: 5, description: '', updatedAt: '',
  }];

  return (
    <div>
      <p>Esto funciona?</p>
    </div>
  );
};

export default ProductReview;
