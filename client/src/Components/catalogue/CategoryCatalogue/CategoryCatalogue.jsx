import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import ProductCard from '../ProductCard/ProductCard';
import { getProdutsByCategory, restartProductsByCategory } from '../../../redux/actions/actions';
import FilterCatalogue from '../Catalogue/FilterCatalogue/FilterCatalogue';
import './CategoryCatalogue.css';
import Spiner from '../../Spiner/Spiner';
import { cataloguePag, getPageFromURL } from '../utils/paged';
import Paged from '../Catalogue/Paged';

function CategoryCatalogue() {
  const products = useSelector((state) => state.productsByCategory);
  const [productsDisplay, setProductsDisplay] = useState([...products]);
  const history = useHistory();
  const [page, setPage] = useState('');
  const [pivote, setPivote] = useState(true);

  const dispatch = useDispatch();
  const { categoryId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    setProductsDisplay([...cataloguePag(products, page)]);

    return () => { dispatch(restartProductsByCategory()); };
  }, []);

  useEffect(() => {
    setPage(getPageFromURL());
  }, [products, pivote]);

  useEffect(() => {
    dispatch(getProdutsByCategory(categoryId));
  }, [categoryId]);

  useEffect(() => {
    setProductsDisplay([...cataloguePag(products, page)]);
  }, [products, pivote, page]);

  const handlePage = (i) => {
    history.push(`${window.location.pathname}?page=${Number(page) + i}`);
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
      <div className="categoryDiv">
        {!productsDisplay.length ? <Spiner msg="Lo lamentamos, no se encontraron coincidencias" /> : null}
        {productsDisplay.map((p) => (
          <ProductCard
            product={p}
            name={p.name}
            price={p.price}
            id={p.id}
            image={p.images}
            review={p.review}
            stockAmount={p.stockAmount}
            key={p.id}
          />
        ))}
        <div className="pagedBottom">
          <Paged products={products} page={page} onClick={handlePage} />
        </div>
      </div>
    </div>
  );
}

export default CategoryCatalogue;
