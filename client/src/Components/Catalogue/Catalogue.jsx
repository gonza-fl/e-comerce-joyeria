import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import "./catalogo.css"
import ProductCard from "../ProductCard/ProductCard"
import FilterCatalogue from './FilterCatalogue/FilterCatalogue';
import { useLocation } from 'react-router-dom';
import { getProducts } from '../../actions/actions.js';

export default function Catalogue() {
  const dispatch = useDispatch();
  const isQuery = useLocation().search.includes('search')
  const categoryId = useSelector(state => state.categorieId);
  
  const products = useSelector((state) => isQuery ? state.productsByQuery : state.products);
  console.log('state',products)
  const [productsDisplay, setProductsDisplay] = useState([...products]);

  useEffect(()=>{
    if(productsDisplay.length === 0 || 
      productsDisplay.length !== products.length &&
      productsDisplay[0] !== products[0]){
      setProductsDisplay(products)
    } 
    
  },[products])
  useEffect(() => {
    dispatch(getProducts())
    window.scrollTo(0, 0);
  }, [productsDisplay]);


  
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

