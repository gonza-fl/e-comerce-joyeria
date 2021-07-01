import React from 'react';
import ShowCategories from './ShowCategories/ShowCategories';
import NewsFlyer from './NewsFlyer/NewsFlyer';
import './Home.css';

export default function Home() {
  return (
    <div className="home">
      <h1 className="bg-color-six">Novedades</h1>
      <NewsFlyer />
      <ShowCategories />
    </div>
  );
}
