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

export default function ProductCard({
  product, id, name, price, image, review, stockAmount,
}) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.id);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  return (
    <DivCard style={{ display: 'flex' }}>

      <Carousel image={image.map((i) => i.url)} id={id} />
      <h3>{name}</h3>
      <span>
        $
        {' '}
        {numberWithCommas(price)}
      </span>
      <br />
      <ReactStars
        count={5}
        size={24}
        edit={false}
        value={review}
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
                  setTimeout(() => { dispatch(showFloatingCart('none')); }, 2000);
                  window.scrollTo(0, 0);
                } catch (err) {
                  swal('Lo sentimos!', 'no hay stock suficiente para seguir sumando');
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
            .map((imgEl) => <img key={imgEl} src={`${imgEl}`} alt="" width="230px" height="230px" />)}
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
          width: 30%;
          margin-bottom: 30px;

          &:hover {
            transform: Scale(1.05);
            transition: transform 300ms;
          }
`;

const DivCarousel = styled.div`
          display: flex;
          align-items: center;
          font-size: 130%;
`;
