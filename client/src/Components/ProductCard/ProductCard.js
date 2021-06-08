import React from 'react';
import StyledButton from '../../StyledComponents/Button';
import ReactStars from "react-rating-stars-component";
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


export default function ProductCard({id, name, price, image, review}) {
  
  return (
    <Link to = {`${id}`} style={{textDecoration: 'inherit', color: 'inherit'}}>
      <DivCard>
          <Carousel image = {image}/>
          <h3>{name}</h3>
          <span>$ {price}</span><br/>
          <ReactStars
              count={5}
              size={24}
              edit={false}
              value={review}
              activeColor="#ffd700"
            />
          <StyledButton text = 'Agregar al carrito'/>
      </DivCard>
    </Link>
  );
};

function Carousel({image}){
  const img = [...image];
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
        .map(img => <img src={`${img}`} alt='Image not found' width='250px' height='250px'/>)}
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
`;

const DivCarousel = styled.div`
          display: flex;
          align-items: center;
          font-size: 120%;
`