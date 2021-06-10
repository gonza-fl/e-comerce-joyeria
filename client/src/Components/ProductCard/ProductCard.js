import React from 'react';
import StyledButton from '../../StyledComponents/Button';
import ReactStars from "react-rating-stars-component";
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


export default function ProductCard({id, name, price, image, review}) {
  
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
      <DivCard>
          <Carousel image = {image} id = { id }/>
          <h3>{name}</h3>
          <span>$ {numberWithCommas(price)}</span><br/>
          <ReactStars
              count={5}
              size={24}
              edit={false}
              value={review}
              activeColor="#ffd700"
            />
          <StyledButton text = 'Agregar al carrito'/>
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
        <Link to = {`${id}`} style={{textDecoration: 'inherit', color: 'inherit'}}>
          <img src={`${img}`} alt='Image not found' width='250px' height='250px'/>
        </Link>
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
          
          &:hover {
            transform: Scale(1.05);
            transition: transform 500ms;
          }
`;

const DivCarousel = styled.div`
          display: flex;
          align-items: center;
          font-size: 130%;
`