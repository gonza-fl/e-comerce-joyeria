import React from 'react';
import StyledButton from '../../StyledComponents/Button';
import ReactStars from "react-rating-stars-component";
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from "react-redux"
import { addToCart, getProductDetail } from '../../actions/actions';
import "./productCard.css"
import Button from '../../StyledComponents/Button';


export default function ProductCard({product, id, name, price, image, review}) {


  const dispatch = useDispatch()

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
      <DivCard>
          <Link to = {`/products/product/${id}`} style={{textDecoration: 'inherit', color: 'inherit'}} >
            <Carousel image = {image.map(i => i.url)} id = { id }/>
          <h3>{name}</h3>
          </Link>
          <span>$ {numberWithCommas(price)}</span><br/>
          <ReactStars
              count={5}
              size={24}
              edit={false}
              value={review}
              activeColor="#ffd700"
            />
          <Button style={{backgroundColor: '#f1eee3'}} handleClick={() => dispatch(addToCart(product))} text = 'Agregar al carrito'/>
          
      </DivCard>
  );
};

function Carousel({id, image}){
  
  const img = typeof image === 'object' ? [...image] : [image];
  
  const [imgIndex, setImgIndex] = React.useState(0);
  
  function beforeCarousel() {
    if (imgIndex > 0) {
      setImgIndex(imgIndex - 1);
    }
  }

  function nextCarousel() {
    if (imgIndex < img.length-1) {
      setImgIndex(imgIndex + 1);
    }
  }
 

  return(
    <DivCarousel>
      <MdNavigateBefore onClick = { beforeCarousel }/>
      <div>
        {img.filter((img, i) => i===imgIndex)
        .map(img => 
          <img src={`${img}`} alt='Image not found' width='250px' height='250px' />
        )}
      </div>
      <MdNavigateNext onClick = { nextCarousel }/>
    </DivCarousel>
  )};

const DivCard = styled.div`
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 290px;
          padding: 5px;
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
`