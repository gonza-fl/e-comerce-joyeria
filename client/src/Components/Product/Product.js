import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { addToCart } from '../../actions/actions';
import Button from '../../StyledComponents/Button';
import ModalModifyProduct from '../ModifyProduct/ModalModifyProduct/ModalModifyProduct';
// import axios from 'axios';
import './Product.css';
import swal from 'sweetalert';

const REACT_APP_API = process.env.REACT_APP_API

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

    // esto despues hay que borrarlo:
    const productDetailTest = {
        name: 'K-Mora Accesorios',
        price: 500,
        description: 'Una joya o alhaja es un objeto ornamental usado para adornar o embellecer el cuerpo. Generalmente una joya se fabrica con piedras y metales preciosos, aunque también se pueden emplear otros materiales para fabricar joyas, como por ejemplo papel de revistas endurecido o joyas de plástico recuperado del océano, entre otras innovaciones en bisutería. Colgantes de ámbar. En sus diversas formas, las joyas sirven principalmente para efectos estéticos y ornamentales en todas las culturas humanas y continentes. En algunos casos, las joyas se usan bajo el concepto del pudor con el objetivo de cubrir algunos genitales mientras que en otros casos se usan para destacar estos.​ También las joyas se usan simbólicamente para representas características propias de cada individuo y de sus creencias.',
        stockAmount: 6,
        url: ['https://cdn.cnn.com/cnnnext/dam/assets/210210215637-best-jewelry-under-100-lead.jpg',
        'https://i.ebayimg.com/images/g/8YMAAOSweKNeLtvS/s-l400.jpg',
        'https://www.cleanipedia.com/images/v2/9bfd852d0b6094e9d82e6312dedca918-1800w-1200h.jpg'    
        ]
    }

    const [bigImage, setBigImage] = useState(productDetailTest.url[0]);

    const changeImage = (e) => {
        setBigImage(e.target.src);
    }

    let noStock = false;
    let lowStock = false;
    if (productDetailTest.stockAmount === 0) {
        noStock = true;
    } else if(productDetailTest.stockAmount < 5) {
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
            axios.delete(`${REACT_APP_API}/api/products:${productDetail.id}`)
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
                    <img src={bigImage} alt={productDetailTest.name} />
                </div>
                
                <div className="container-minpics">
                    {productDetailTest.url.length <= 3
                    ?
                    productDetailTest.url.map(image => <img src={image} onClick={(e) => changeImage(e)} />)
                    : null
                    }
                </div>
            </div>

            <div className="product-info">
                <h1>{productDetailTest.name}</h1>
                <h4>${productDetailTest.price}</h4>
                <p className="product-info-description">{productDetailTest.description}</p>
                {/* <h4>Rating: {productDetail.rating || '5'}</h4>   */}
                <div className="product-addCart">
                    {noStock && <h5 className="last-stock">Stock Agotado</h5>}
                    {lowStock && <h5 className="last-stock">Ultimas {productDetailTest.stockAmount} unidades!!</h5>}
                    {!lowStock && !noStock && <h5>Stock: {productDetailTest.stockAmount} unidades</h5>}
                    
                    {/* botón para agregar al carrito: le falta la prop handleClick que le debería pasar la accion de agregar al carrito. Para los usuarios debería guardarlo en la tabla de orden de compra, y para los invitados debería guardarlo en el local storage */}
                    {noStock ? null : <Button text={'AGREGAR AL CARRITO'} /> }
                </div>
                <ModalModifyProduct id={productDetailTest.id}></ModalModifyProduct> <span><button onClick={(e) => handleDelete(e)}>Eliminar Producto</button></span>
            </div>
        </div>
    )
}

export default Product;