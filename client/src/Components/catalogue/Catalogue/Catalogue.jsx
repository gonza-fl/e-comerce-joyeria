/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Catalogue.css';
import { useLocation } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';
import FilterCatalogue from './FilterCatalogue/FilterCatalogue';
import { getProducts, getProductsByName } from '../../../redux/actions/actions';
import Spiner from '../../Spiner/Spiner';

export default function catalogue() {
  const dispatch = useDispatch();
  const isQuery = useLocation().search.includes('search');
  const [query, setQuery] = useState(useLocation().search.split('=')[1]);

  const products = useSelector((state) => (isQuery ? state.productsByQuery : state.products));
  const [productsDisplay, setProductsDisplay] = useState([...products]);

  useEffect(() => {
    window.scrollTo(0, 0);
    isQuery ? dispatch(getProductsByName(query)) : dispatch(getProducts());
  }, []);

  useEffect(() => {
    if (productsDisplay.length === 0
      || (productsDisplay.length !== products.length
      || productsDisplay[0] !== products[0])) {
      setProductsDisplay([...products]);
    }
  }, [products]);

  return (
    <div className="catalogue">
      <FilterCatalogue
        products={productsDisplay}
        setProducts={setProductsDisplay}
        productsGlobal={products}
      />
      <div className="catalogueMap">
        {!productsDisplay.length ? <Spiner msg="Lo lamentamos, no se encontraron coincidencias" /> : null}
        {productsDisplay.map((product) => (
          <ProductCard
            product={product}
            name={product.name}
            price={product.price}
            id={product.id}
            image={product.images}
            review={product.review}
            stockAmount={product.stockAmount}
            key={product.id}
          />
        ))}
      </div>

    </div>
  );
}
