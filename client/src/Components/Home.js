import React from 'react';
import { setTest } from '../actions/actions.js';
import Filters from './Filters/Filters.js';
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { getCategories } from "../actions/actions";
import ProductCard from './ProductCard/ProductCard';
import { Link } from "react-router-dom";
import './Home.css';
import NewsFlyer from './NewsFlyer/NewsFlyer.js';

export function Home() {

  const images = ["https://i.ibb.co/1X8bTBj/flyer-mothers-day.png",
                    "https://i.ibb.co/Vtjchmm/product-one-md.png",
                    "https://i.ibb.co/ypqTSx7/product-two-md.png"]

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories())
  })

  return (
    <div className='home bg-color-six'>
      <h1>NEWS</h1>
      <NewsFlyer images = {images}/>

      <Filters />

      <Link to="/createProduct"> <div style={{
        "background-color": "red",
      }}>
        <p>PROBANDO LINK</p>

      </div></Link>
    </div>
  );
};