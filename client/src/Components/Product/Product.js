import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { addToCart } from '../../actions/actions';
import Button from '../../StyledComponents/Button';
import ModalModifyProduct from '../ModifyProduct/ModalModifyProduct/ModalModifyProduct';
import axios from 'axios';
import './Product.css';
import swal from 'sweetalert';

const REACT_APP_API = process.env.REACT_APP_API

const Product = (props) => {

    const [productDetail, setProductDetail] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:3001/products/${props.match.params.id}`)
            .then((response) => {
                setProductDetail(response.data);
            })
            .catch((err) => console.log(err));
    }, [props.match.params.id])

    const [bigImage, setBigImage] = useState(productDetail.url[0]);

    const changeImage = (e) => {
        setBigImage(e.target.src);
    }

    let noStock = false;
    let lowStock = false;
    if (productDetail.stockAmount === 0) {
        noStock = true;
    } else if(productDetail.stockAmount < 5) {
        lowStock = true;
    }

    const handleDelete = (e) => {
        e.preventDefault();
        swal({
            title: "Estas seguro?",
            text: "Al aceptar este producto desaparecera del catalogo!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
            axios.delete(`${REACT_APP_API}/api/products/${productDetail.id}`)
              swal("Producto eliminado!", {
                icon: "success",
              });
            } else {
              swal("cancel");
            }
          });
    }

    return (
        <div className="product-container">
            <div className="product-img">
                <div className="bigimg-container">
                    <img src={bigImage} alt={productDetail.name} />
                </div>
                
                <div className="container-minpics">
                    {productDetail.url.length <= 3
                    ?
                    productDetail.url.map(image => <img src={image} onClick={(e) => changeImage(e)} />)
                    : null
                    }
                </div>
            </div>

            <div className="product-info">
                <h1>{productDetail.name}</h1>
                <h4>${productDetail.price}</h4>
                <p className="product-info-description">{productDetail.description}</p>
                {/* <h4>Rating: {productDetail.rating || '5'}</h4>   */}
                <div className="product-addCart">
                    {noStock && <h5 className="last-stock">Stock Agotado</h5>}
                    {lowStock && <h5 className="last-stock">Ultimas {productDetail.stockAmount} unidades!!</h5>}
                    {!lowStock && !noStock && <h5>Stock: {productDetail.stockAmount} unidades</h5>}
                    
                    {/* botón para agregar al carrito: le falta la prop handleClick que le debería pasar la accion de agregar al carrito. Para los usuarios debería guardarlo en la tabla de orden de compra, y para los invitados debería guardarlo en el local storage */}
                    {noStock ? null : <Button text={'AGREGAR AL CARRITO'} /> }
                </div>
                <ModalModifyProduct id={productDetail.id}></ModalModifyProduct> <span><button onClick={(e) => handleDelete(e)}>Eliminar Producto</button></span>
            </div>
        </div>
    )
}

export default Product;