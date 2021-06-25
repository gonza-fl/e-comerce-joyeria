import React from 'react';
import ShowCategories from './ShowCategories/ShowCategories';

import NewsFlyer from './NewsFlyer/NewsFlyer';
import './Home.css';

export default function Home() {
  const images = ['https://i.ibb.co/1X8bTBj/flyer-mothers-day.png',
    'https://i.ibb.co/Vtjchmm/product-one-md.png',
    'https://i.ibb.co/ypqTSx7/product-two-md.png'];

  return (
    <div className="home">
      <h1 className="bg-color-six">Novedades</h1>
      <NewsFlyer images={images} />
      <ShowCategories />
    </div>
  );
}
