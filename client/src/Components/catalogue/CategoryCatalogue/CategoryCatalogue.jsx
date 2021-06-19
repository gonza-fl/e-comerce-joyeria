/* eslint linebreak-style: ["error", "windows"] */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';
import { getProdutsByCategory } from '../../../redux/actions/actions';
import './CategoryCatalogue.css';

function CategoryCatalogue() {
  const products = useSelector((state) => state.productsByCategory);
  const dispatch = useDispatch();
  const { categoryId } = useParams();
  console.log(products);
  useEffect(() => {
    dispatch(getProdutsByCategory(categoryId));
  }, [categoryId]);
  return (
    <div className="categoryDiv">
      {products.map((p) => (
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
  );
}

export default CategoryCatalogue;
