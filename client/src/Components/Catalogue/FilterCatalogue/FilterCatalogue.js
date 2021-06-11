import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './FilterCatalogue.css';
import StyledButton from '../../../StyledComponents/Button'
import ReactStars from "react-rating-stars-component";
import { sortAscending, sortDescending, sortNameAsc, sortNameDesc } from './utils/sorts';
import { findByPrice, findByStars } from './utils/finds';


export default function FilterCatalogue({ products, setProducts }) {

    const productsGlobal = useSelector((state) => state.products);
    const [input, setInput] = useState({ min: '', max: '' });
    const [undo, setUndo] = useState(false);

    const handleInputChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        document.getElementById('submit').disabled = (!input.min || !input.max || !Number(input.min) || !Number(input.max))
    }, [input]);

    const handleChoise = (e) => {

        if (typeof e === 'number')
            setProducts([...findByStars(products, e)]);

        else {
            e.preventDefault();
            setProducts([...findByPrice(products, input.max, input.min)])
        }
        setUndo(true);
    };

    return (
        <div className='ctnFiltersCat  bg-color-six'>
            <h1>{products.length} Resultados</h1>
            {undo && <StyledButton text={'Deshacer'} handleClick={() => setProducts([...productsGlobal])} ></StyledButton>}
            <h3>Ver </h3>
            <h5>Alfabéticamente</h5>
            <p onClick={() => setProducts([...sortNameAsc(products)])}>A-Z</p>
            <p onClick={() => setProducts([...sortNameDesc(products)])}>Z-A</p>


            <h5>Precio</h5>
            <p onClick={() => setProducts([...sortDescending(products, 'price')])}>Mayor</p>
            <p onClick={() => setProducts([...sortAscending(products, 'price')])}>Menor</p>

            <form onSubmit={handleChoise}>
                <input name='min' placeholder='Minimo..' onChange={handleInputChange} />
                <span>-</span>
                <input name='max' placeholder='Maximo..' onChange={handleInputChange} />
                <input id='submit' type='submit' value='>' disabled />
            </form>

            <h5>Estrellas</h5>
            <div onClick={() => setProducts([...sortDescending(products, 'review')])} >Mas Estrellas
                <ReactStars count={5} size={20} edit={false} value={5} activeColor="#ffd700" /></div>

            <div onClick={() => setProducts([...sortAscending(products, 'review')])}>Menos Estrellas
                <ReactStars count={5} size={20} edit={false} value={2} activeColor="#ffd700" /></div>

            <span>Elegir</span>
            <ReactStars count={5} size={20} value={0} activeColor="#ffd700"
                onChange={handleChoise} />

        </div>
    )
}