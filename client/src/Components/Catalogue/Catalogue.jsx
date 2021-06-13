import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import "./catalogo.css"
import ProductCard from "../ProductCard/ProductCard"
import FilterCatalogue from './FilterCatalogue/FilterCatalogue';
import { useLocation } from 'react-router-dom';

export default function Catalogue() {

  const isQuery = useLocation().search.includes('search')

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const products = useSelector((state) => isQuery ? state.productsByQuery : state.products);
  console.log(products)
  const [productsDisplay, setProductsDisplay] = useState([...products]);

  return (
    <div className="catalogue">
      <FilterCatalogue products={productsDisplay} setProducts={setProductsDisplay} productsGlobal={products} />
      <div className='catalogueMap'>
        {!productsDisplay.length ? <h1>Lo lamentamos, no se encontraron coincidencias</h1> : null}
        {productsDisplay.map(product => {
          return <ProductCard product={product} name={product.name} price={product.price} id={product.id} image={product.images} review={product.review}></ProductCard>
        })}
      </div>

    </div>
  );
};

