/* eslint-disable react/style-prop-object */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import ProductCard from '../catalogue/ProductCard/ProductCard';
import FilterCatalogue from '../catalogue/Catalogue/FilterCatalogue/FilterCatalogue';
import { getProducts, getProductsByName } from '../../redux/actions/actions';
import Spiner from '../Spiner/Spiner';
import { cataloguePag, getPageFromURL } from '../catalogue/utils/paged';
import Paged from '../catalogue/Catalogue/Paged';
import './justDiscounted.css';

export default function catalogue() {
  const dispatch = useDispatch();
  const isQuery = useLocation().search.includes('search');
  const [query, setQuery] = useState(useLocation().search.split('=')[1]);
  const [page, setPage] = useState('');
  // eslint-disable-next-line max-len
  const products = useSelector((state) => (isQuery ? state.productsByQuery : state.products)).filter((p) => p.discount > 0);
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
      <div className="filterResponsive">
        <div className="iconFilter"><FaBars /></div>
        <FilterCatalogue
          products={productsDisplay}
          setProducts={setProductsDisplay}
          productsGlobal={cataloguePag(products, page)}
          total={products.length}
        />
      </div>
      <div className="catalogueMap">
        {!productsDisplay.length ? <Spiner msg="Lo lamentamos, no tenemos productos en oferta" /> : null}
        {productsDisplay.filter((p) => p.discount > 0).map((product) => (
          <ProductCard
            product={product}
            name={product.name}
            price={product.price}
            id={product.id}
            image={product.images}
            review={product.review}
            stockAmount={product.stockAmount}
            key={product.id}
            discount={product.discount}
          />
        ))}
        <div className="pagedBottom">
          <Paged products={products} page={page} onClick={handlePage} />
        </div>
      </div>
    </div>
  );
}
