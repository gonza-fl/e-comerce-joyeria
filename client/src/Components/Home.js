import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch,} from "react-redux";
import { getCategories } from "../actions/actions";
import ProductCard from './ProductCard/ProductCard';
import {Link} from "react-router-dom"

export function Home() {

    const dispatch = useDispatch();
    useEffect(() =>{
       dispatch(getCategories())
    },)

  return (
    <div>
     
      <Link to="/createProduct"> <div style={{"background-color":"red",
      }}>
        <p>PROBANDO LINK</p>

      </div></Link>
    </div>
  );
};