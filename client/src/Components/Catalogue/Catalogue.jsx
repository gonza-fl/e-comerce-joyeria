import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import "./catalogo.css"
import ProductCard from "../ProductCard/ProductCard"
import FilterCatalogue from './FilterCatalogue/FilterCatalogue';

export default function Catalogue() {
  const products = useSelector((state) => state.products);

  const [productsDisplay, setProductsDisplay] = useState(products);

  return (
    <div className="catalogo">
      <FilterCatalogue products={productsDisplay} />
      {productsDisplay.map(product => {
        return <ProductCard name={product.name} price={product.price} id={product.id} image={product.image} review={product.review}></ProductCard>
      })}
    </div>
  );
};