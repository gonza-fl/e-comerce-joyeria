import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Product = (props) => {

    const [productDetail, setProductDetail] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:3001/products/${props.match.params.id}`)
        // cambiar el localhost por una variable que vaya en un .env
            .then((response) => {
                setProductDetail(response.data);
            })
            .catch((err) => console.log(err));
    }, [props.match.params.id])

    return (
        <div>
            <h1>{productDetail.title}</h1>
            <h4>{productDetail.price}</h4>
            <p>{productDetail.description}</p>
            <h5>{productDetail.stock}</h5>
        </div>
    )
}

export default Product;