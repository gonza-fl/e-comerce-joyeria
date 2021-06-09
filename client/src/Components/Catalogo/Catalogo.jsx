import React from 'react';
import { useSelector } from 'react-redux';
import "./catalogo.css"
import ProductCard from "../ProductCard/ProductCard"

export function Catalogo() {
    const products = useSelector((state) => state.products)
   
  return (
    <div className="catalogo">
      {products.map(product => {
          return <ProductCard name={product.name} price={product.price} id={product.id} image={product.image} review={product.review}></ProductCard>
      })}
    </div>
  );
};