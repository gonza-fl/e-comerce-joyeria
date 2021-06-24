/* eslint-disable react/style-prop-object */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Catalogue.css';
import { useHistory, useLocation } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';
import FilterCatalogue from './FilterCatalogue/FilterCatalogue';
import { getProducts, getProductsByName } from '../../../redux/actions/actions';
import Spiner from '../../Spiner/Spiner';
import { cataloguePag, getPageFromURL } from '../utils/paged';
import Paged from './Paged';

export default function catalogue() {
  const dispatch = useDispatch();
  const isQuery = useLocation().search.includes('search');
  const [query, setQuery] = useState(useLocation().search.split('=')[1]);
  const [page, setPage] = useState('');
  const products = useSelector((state) => (isQuery ? state.productsByQuery : state.products));
  const [productsDisplay, setProductsDisplay] = useState([...products]);
  const [pivote, setPivote] = useState(true);

  const history = useHistory();
  useEffect(() => {
    window.scrollTo(0, 0);
    isQuery ? dispatch(getProductsByName(query)) : dispatch(getProducts());
  }, []);

  useEffect(() => {
    setPage(getPageFromURL());
  }, [query, products, pivote]);

  useEffect(() => {
    if (productsDisplay.length === 0
      || (productsDisplay.length !== products.length
      || productsDisplay[0] !== products[0])) {
      setProductsDisplay([...cataloguePag(products, page)]);
    }
  }, [products, page]);

  const handlePage = (i) => {
    if (!isQuery) {
      history.push(`${window.location.pathname}?page=${Number(page) + i}`); 
    } else { 
      history.push(`${window.location.pathname}${window.location.search.split('&')[0]}&page=${Number(page) + i}`); 
    }
    setPivote(!pivote);
  };

  return (
    <div className="catalogue">
      <Paged products={products} page={page} onClick={handlePage} />
      <FilterCatalogue
        products={productsDisplay}
        setProducts={setProductsDisplay}
        productsGlobal={cataloguePag(products, page)}
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
        <div className="pagedBottom">
          <Paged products={products} page={page} onClick={handlePage} />
        </div>
      </div>
    </div>
  );
}
