/* eslint react/prop-types: 0 */

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GoPrimitiveDot } from 'react-icons/go';
import './NewsFlyer.css';
import axios from 'axios';
import { URL_BANNER } from '../../../constants';

function NewsFlyer() {
  const [flyer, setFlyer] = React.useState(0);
  const [banners, setBanners] = useState([]);

  // eslint-disable-next-line
  function dots(index) {
    if (flyer === index) {
      return { color: 'gray' };
    }
  }

  useEffect(() => {
    axios.get(URL_BANNER)
      .then((res) => setBanners(res.data.map((img) => img.url)));
  }, []);

  React.useEffect(() => {
    const timeoutHandle = setInterval(() => {
      if (flyer === banners.length - 1) {
        setFlyer(0);
      } else {
        setFlyer(flyer + 1);
      }
    }, 4000);
    return () => clearInterval(timeoutHandle);
  }, [flyer]);

  function onClickIndex(index) {
    setFlyer(index);
  }

  return (
    <div className="newsFlyer">
      {banners && banners.map((img, i) => (
        <GoPrimitiveDot
          key={img}
          style={dots(i)}
          onClick={() => onClickIndex(i)}
        />
      ))}
      {banners && banners
        .filter((img, i) => i === flyer)
        .map((img) => <StyledImg key={img} src={img} alt="Image not found" width="900px" height="600px" />)}
    </div>
  );
}

const StyledImg = styled.img`
        display: block;
        box-shadow: 0px 0px 15px 2px rgb(102, 102, 102) ;
        animation: transitionIn 1000ms;
        opacity: 0.8;

        &:hover {
            cursor: pointer;
            transform: Scale(1.02);
            transition: transform 300ms;
            opacity: 1;
        }

        @keyframes transitionIn {
            from {
                opacity: 0;
                transform: rotateX(-10deg);
            }

            to {
                opacity: 0.8;
                transform: rotateX(0);
            }
        }
        @media (max-width: 768px) {
          width:95%;
          max-heigth: 380px
          height:auto;
         
        }
        @media (max-width: 452px) {
          width:95%;
          height:270px;
        }
`;
export default NewsFlyer;
