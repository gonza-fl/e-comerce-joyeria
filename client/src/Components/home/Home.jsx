import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ShowCategories from './ShowCategories/ShowCategories';

import { restartProductsByCategory } from '../../redux/actions/actions';
import NewsFlyer from './NewsFlyer/NewsFlyer';
import './Home.css';

export default function Home() {
  const images = ['https://i.ibb.co/1X8bTBj/flyer-mothers-day.png',
    'https://i.ibb.co/Vtjchmm/product-one-md.png',
    'https://i.ibb.co/ypqTSx7/product-two-md.png'];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restartProductsByCategory());
  }, []);

  return (
    <div className="home">
      <h1 className="bg-color-six" style={{ width: '75%' }}>NEWS</h1>
      <NewsFlyer images={images} />
      <ShowCategories />
    </div>
  );
}
