import React, {useEffect} from 'react';
import Filters from './Filters/Filters.js';
import { useDispatch, useSelector } from "react-redux";

import { getCategories } from "../actions/actions";
import './Home.css';
import NewsFlyer from './NewsFlyer/NewsFlyer.js';

export function Home() {

  const images = ["https://i.ibb.co/1X8bTBj/flyer-mothers-day.png",
    "https://i.ibb.co/Vtjchmm/product-one-md.png",
    "https://i.ibb.co/ypqTSx7/product-two-md.png"]

  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories);

  useEffect(()=>{
   dispatch(getCategories())
  },[])
  

  return (
    <div className='home'>
      <h1 className={'bg-color-six'} style={{ width: '75%' }}>NEWS</h1>
      <NewsFlyer images={images} />
      <Filters />
    </div>
  );
};