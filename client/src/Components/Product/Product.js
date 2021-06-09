import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import './Product.css';

const Product = (props) => {

    const [productDetail, setProductDetail] = useState({});

    // useEffect(() => {
    //     axios.get(`http://localhost:3001/products/${props.match.params.id}`)
    //     // cambiar el localhost por una variable que vaya en un .env
    //         .then((response) => {
    //             setProductDetail(response.data);
    //         })
    //         .catch((err) => console.log(err));
    // }, [props.match.params.id])

    return (
        <div className="product-container">
            <h1>{productDetail.title || 'Titulo'}</h1>
            <h4>{productDetail.price || '$100'}</h4>
            <p className="product-container-description">{productDetail.description || 'Esto es un producto'}</p>
            <h5>Stock: {productDetail.stock || '3'}</h5>
        </div>
    )
}

export default Product;