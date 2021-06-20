import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';
import { getProdutsByCategory } from '../../../redux/actions/actions';
import FilterCatalogue from '../Catalogue/FilterCatalogue/FilterCatalogue';
import './CategoryCatalogue.css';

function CategoryCatalogue() {
  const products = useSelector((state) => state.productsByCategory);
  const [productsDisplay, setProductsDisplay] = useState([...products]);

  const dispatch = useDispatch();
  const { categoryId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getProdutsByCategory(categoryId));
  }, [categoryId]);

  useEffect(() => {
    if (productsDisplay.length === 0
      || (productsDisplay.length !== products.length
      && productsDisplay[0] !== products[0])) {
      setProductsDisplay(products);
    }
  }, [products]);

  return (
    <div className="catalogue">
      <FilterCatalogue
        products={productsDisplay}
        setProducts={setProductsDisplay}
        productsGlobal={products}
      />
      <div className="categoryDiv">
        {!productsDisplay.length ? <h1>Lo lamentamos, no se encontraron coincidencias</h1> : null}
        {productsDisplay.map((p) => (
          <ProductCard
            product={p}
            name={p.name}
            price={p.price}
            id={p.id}
            image={p.images}
            review={p.review}
            stockAmount={p.stockAmount}
          />
        ))}
      </div>

    </div>
  );
}

export default CategoryCatalogue;
