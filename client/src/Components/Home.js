import React from 'react';
import { setTest } from '../actions/actions.js';
import Filters from './Filters/Filters.js';
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { getCategories } from "../actions/actions";
import ProductCard from './ProductCard/ProductCard';
import { Link } from "react-router-dom"

export function Home() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories())
  })

  return (
    <div>
      <ProductCard
        id={1}
        name={'Aretes A105'}
        price={20000}
        review={3}
        image={['https://i.ibb.co/TP0L9w9/aretes-kmora.png', "https://i.ibb.co/ChNDJ8J/5843436fa7d2ac55891ea07768d2f1fee88278fd.jpg"]}
      />
      <Filters />

      <Link to="/createProduct"> <div style={{
        "background-color": "red",
      }}>
        <p>PROBANDO LINK</p>

      </div></Link>
    </div>
  );
};