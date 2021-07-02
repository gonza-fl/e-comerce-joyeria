/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React from 'react';
import ReactStars from 'react-rating-stars-component';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../utils/cartFunctions';
import Button from '../../StyledComponents/Button';
import { showFloatingCart } from '../../../redux/actions/actions';
import './productCard.css';

export default function ProductCard({
  product, id, name, price, image, review, stockAmount,
}) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.id);

  function numberWithCommas(x) {
    x = x.toFixed(2);
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  let roundAverage = 0;
  if (review && review.length !== 0) {
    roundAverage = Math.floor(review.map((rev) => rev.calification).reduce((a, b) => a + b, 0) / review.length);
  }

  return (
    <DivCard className="contenedor" style={{ display: 'flex' }}>
      <div className="productCardImg">
        <Carousel image={image.map((i) => i.url)} id={id} />
        {product.discount > 0 ? (
          <div className="ribbon">
            <p>
              {`${product.discount}%`}
              OFF!
            </p>
          </div>
        ) : null}
      </div>
      <h3>{name}</h3>
      {product.discount ? (
        <span className="priceCrossed">
          {price}
        </span>
      ) : null }
      <span>
        $
        {product.discount ? numberWithCommas(price - ((price * product.discount) / 100)) : numberWithCommas(price) }
      </span>
      <br />

      <ReactStars
        count={5}
        size={24}
        edit={false}
        value={roundAverage}
        activeColor="#ffd700"
      />

      {stockAmount === 0 ? <h3> AGOTADO </h3>
        : (
          <Button
            style={{ backgroundColor: '#f1eee3', marginTop: '10px' }}
            handleClick={
              async () => {
                try {
                  dispatch(showFloatingCart('none'));
                  await addToCart(product, userId);
                  dispatch(showFloatingCart('inline'));
                  document.body.style.opacity = 0.7;
                  setTimeout(() => { document.body.style.opacity = 1; dispatch(showFloatingCart('none')); }, 2000);
                } catch (err) {
                  swal('Lo sentimos!', 'no hay stock suficiente para seguir sumando', 'warning');
                }
              }
            }
            text="Agregar al carrito"
          />
        )}

    </DivCard>
  );
}

function Carousel({ image, id }) {
  const img = typeof image === 'object' ? [...image] : [image];

  const [imgIndex, setImgIndex] = React.useState(0);

  function beforeCarousel() {
    if (imgIndex > 0) {
      setImgIndex(imgIndex - 1);
    }
  }

  function nextCarousel() {
    if (imgIndex < img.length - 1) {
      setImgIndex(imgIndex + 1);
    }
  }

  return (
    <DivCarousel>
      {img.length > 1 && <MdNavigateBefore onClick={beforeCarousel} /> }
      <div>
        <Link to={`/products/product/${id}`} style={{ textDecoration: 'inherit', color: 'inherit' }}>
          {img.filter((imgEl, i) => i === imgIndex)
            .map((imgEl) => <img key={imgEl} src={`${imgEl}`} alt="" width="90%" height="90%" />)}
        </Link>
      </div>
      {img.length > 1 && <MdNavigateNext onClick={nextCarousel} />}
    </DivCarousel>
  );
}

const DivCard = styled.div`
          flex-direction: column;
          align-items: center;
          padding:5px;
          width: 25%;
          margin-bottom: 30px;
          animation: transitionIn 600ms;
          possition: relative;

          &:hover {
            transform: Scale(1.05);
            transition: transform 300ms;
          }


            @media (max-width: 768px) {
              img {
                width:98%;
                height:96%;
              }
              padding:0;
              width: 40%;
              
          @keyframes transitionIn {
            from {
                opacity: 0;
                transform: rotateX(-10deg);
            }
        
            to {
                opacity: 1;
                transform: rotateX(0);
            }
        }

      
`;

const DivCarousel = styled.div`
          display: flex;
          align-items: center;
          font-size: 130%;
`;
