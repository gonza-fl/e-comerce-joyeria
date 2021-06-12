import React, { useEffect, useState } from 'react';
import './Filters.css';
import { categoriesF } from '../fakeDB-Categories';
import CardFilter from './CardFilter/CardFilter';
import StyledButton from '../../StyledComponents/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../actions/actions';
import { Link } from 'react-router-dom';

export default function Filters() {

    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories)
    const handleClick = () => {
        dispatch(getProducts())
    }

    return (
        <div className='ctnFilters'>
            <Link className='link' to='/products'>
                <StyledButton text='Ver catalogo completo' handleClick={handleClick} />
            </Link>
            <div className='ctnCards'>
                <h1>Nuestras categorias</h1>
                {categories.map(cat =>
                    <CardFilter id={cat.id} name={cat.name} img={cat.img} />)}
            </div>
        </div>
    )
}
