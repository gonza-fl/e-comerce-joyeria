import React from 'react';
import './Filters.css';
import CardFilter from './CardFilter/CardFilter';
import StyledButton from '../../StyledComponents/Button';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Filters() {

    const categories = useSelector(state => state.categories)

    return (
        <div className='ctnFilters'>
            <Link className='link' to='/products'>
                <StyledButton text='Ver catalogo completo'/>
            </Link>
            <div className='ctnCards'>
                <h1>Nuestras categorias</h1>
                {categories.map(cat =>
                    <CardFilter id={cat.id} name={cat.name} img={cat.img} />)}
            </div>
        </div>
    )
}
