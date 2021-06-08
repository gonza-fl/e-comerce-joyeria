import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProductos} from '../../actions/actions.js';

import "./catalogo.css"
import ProductCard from "../ProductCard/ProductCard"

export function Catalogo() {
    const products = useSelector((state) => state.products)
    const dispatch = useDispatch();
    
    useEffect(() =>{
       dispatch(getProductos())
    }, [products])
   
  return (
    <div>
      {products.map(product => {
          return <ProductCard name={product.name} price={product.price} id={product.id} image={product.image} review={product.review}></ProductCard>
      })}
    </div>
  );
};