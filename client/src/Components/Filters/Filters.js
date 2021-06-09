import React, { useEffect, useState } from 'react';
import './Filters.css';
import { categoriesF } from '../fakeDB-Categories';
import CardFilter from './CardFilter/CardFilter';
import StyledButton from '../../StyledComponents/Button';
import { useDispatch } from 'react-redux';
import { getProductos } from '../../actions/actions';
import { Link } from 'react-router-dom';

export default function Filters() {
    const [categories, setCategories] = useState([]);
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(getProductos())
    }

    useEffect(() => {
        //posible axios ----> acá <----
        setCategories(categoriesF);
    }, []);

    return (
        <div>
            <Link to='/products'>
                <StyledButton text='Ver Catalogo' handleClick={handleClick} />
            </Link>

            <h1>Categorias !!</h1>
            {categories.map(cat =>
                <CardFilter id={cat.id} name={cat.name} img={cat.img} />)}
        </div>
    )
}