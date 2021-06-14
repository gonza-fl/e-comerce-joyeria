import React, { useEffect } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { useDispatch, useSelector } from 'react-redux'; 
import { getProdutsByCategory } from '../../actions/actions.js';
import { useParams } from 'react-router';
import "./category.css"

function Category() {
    const products = useSelector((state)=>state.productsByCategory)
    const dispatch = useDispatch();
    const { categoryId } = useParams();

    useEffect(()=>{
        dispatch(getProdutsByCategory(categoryId));
    },[])

    return (
        <div className="categoryDiv">
            {products.map((p)=>
                <ProductCard 
                product={p} 
                name={p.name} 
                price={p.price} 
                id={p.id} 
                image={p.images} 
                review={p.review}>
            </ProductCard>)}

        </div>
    );
}

export default Category;