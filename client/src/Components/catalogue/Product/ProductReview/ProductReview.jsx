/* eslint-disable react/jsx-max-props-per-line */
/* eslint-disable react/jsx-props-no-multi-spaces */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import ReactStars from 'react-rating-stars-component';
// import axios from 'axios';
// import { URL_GET_REVIEWS } from '../../../../constants';
import './ProductReview.css';

const ProductReview = ({ productId }) => {
  // cuando se haga la conexion con el back descomentar todo y borrar el array reviewTest
  // en la renderizacion cambiar 'reviewTest' por 'review'
  // no olvidar importar useState y useEffect

  // const [review, setReview] = useState([]);

  // useEffect(() => {
  //   axios.get(`${URL_GET_REVIEWS}${productId}/review`)
  //     .then((response) => {
  //       setReview(response.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  const reviewTest = [
    {
      id: 1, calification: 5, description: 'Hakuna matata, una forma de ser, Hakuna matata, nada que temer',
    },
    {
      id: 2, calification: 3, description: 'Sin preocuparse es como hay que vivir, a vivir así, yo aquí aprendí, Hakuna matata',
    },
    {
      id: 3, calification: 4, description: 'Cuando un joven era él, (¡Cuando joven era yo!), Muy bien, (Gracias)',
    },
    {
      id: 4, calification: 2, description: 'Sintió que su aroma le dio mucha fama, vació la sabana, después de comer, Un alma sensible soy, aunque de cuero cubierto estoy, y a mis amigos, el viento se los llevó',
    },
    {
      id: 5, calification: 1, description: 'Qué vergüenza, (oh, qué vergüenza), Mi nombre cambió a Hortencia, (Su nombre no le queda), Y mucho sufrí yo, (ay, cómo sufrió), Cada vez que yo, ¡Pumba!, no en frente de los niños! ¡Oh!, perdón',
    },
    {
      id: 6, calification: 4, description: 'Hakuna matata, Una forma de ser, Hakuna matata',
    },
  ];

  const average = reviewTest.map((review) => review.calification).reduce((a, b) => a + b, 0) / reviewTest.length;

  return (
    <div className="product-reviews-container">
      <h2 id="product-reviews-container-title">Opiniones sobre el producto</h2>
      <div className="average-review">
        <p id="average-number">{average.toFixed(1)}</p>
        <div className="average-review-stars">
          <ReactStars
            count={5}
            size={24}
            edit={false}
            value={average}
            activeColor="#ffd700"
          />
          <p id="average-declaration">Promedio entre {reviewTest.length} opiniones</p>
        </div>
      </div>
      <div className="description-reviews-container">
        {reviewTest.map((review) => (
          <div className="description-review">
            <ReactStars
              count={5}
              size={24}
              edit={false}
              value={review.calification}
              activeColor="#ffd700"
            />
            <p id="description-review-description">{review.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReview;
