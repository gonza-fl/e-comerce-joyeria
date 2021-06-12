import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import "./catalogo.css"
import ProductCard from "../ProductCard/ProductCard"
import FilterCatalogue from './FilterCatalogue/FilterCatalogue';

export default function Catalogue() {
  const products = useSelector((state) => state.products);

  const [productsDisplay, setProductsDisplay] = useState([...products]);

  return (
    <div className="catalogue">
      <FilterCatalogue products={productsDisplay} setProducts={setProductsDisplay} />
      <div className='catalogueMap'>
        {!productsDisplay.length ?  <h1>Lo siento, no se encontraron coincidencias</h1> : null}
        {productsDisplay.map(product => {
          return <ProductCard product={product} name={product.name} price={product.price} id={product.id} image={product.image} review={product.review}></ProductCard>
        })}
      </div>

    </div>
  );
};