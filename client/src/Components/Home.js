import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch,} from "react-redux";
import { getCategories } from "../actions/actions";
import ProductCard from './ProductCard/ProductCard';

export function Home() {

    const dispatch = useDispatch();
    useEffect(() =>{
       dispatch(getCategories())
    },)

  return (
    <div>
      <ProductCard
        id = {1}
        name = {'Aretes A105'}
        price = {20000}
        review = {3}
        image = {['https://i.ibb.co/TP0L9w9/aretes-kmora.png', "https://i.ibb.co/ChNDJ8J/5843436fa7d2ac55891ea07768d2f1fee88278fd.jpg"]}
      />
    </div>
  );
};