import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./catalogo.css"
import ProductCard from "../ProductCard/ProductCard"
import FilterCatalogue from './FilterCatalogue/FilterCatalogue';
import { useLocation } from 'react-router-dom';
import { getCategories, getProducts, getProdutsByCategory } from '../../actions/actions';

export default function Catalogue() {

  const query = useLocation().search.replaceAll('%20', ' ').substr(1);
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories);
  if (!categories.length) dispatch(getCategories());

  if (query === 'search');// busco lo buscado
  else {
    const category = categories.find(category => category.name === query);
    category ? dispatch(getProdutsByCategory(category.id)) : dispatch(getProducts())
  }


  const products = useSelector((state) => state.products);

  const [productsDisplay, setProductsDisplay] = useState([...products]);

  return (
    <div className="catalogue">
      <FilterCatalogue products={productsDisplay} setProducts={setProductsDisplay} />
      <div className='catalogueMap'>
        {!productsDisplay.length ? <h1>Lo siento, no se encontraron coincidencias</h1> : null}
        {productsDisplay.map(product => {
          return <ProductCard product={product} name={product.name} price={product.price} id={product.id} image={product.image} review={product.review}></ProductCard>
        })}
      </div>

    </div>
  );
};


