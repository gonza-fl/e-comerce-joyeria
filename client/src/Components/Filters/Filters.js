import React from 'react';
import './Filters.css';
import CardFilter from './CardFilter/CardFilter';
import StyledButton from '../../StyledComponents/Button';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProducts } from '../../actions/actions';

export default function Filters() {

    const categories = useSelector(state => state.categories)
    const dispatch = useDispatch();

    return (
        <div className='ctnFilters'>
            <div className='ctnCards'>
                <h1 className={'bg-color-six'} style={{padding: '0px 10px'}}>Nuestras categorías</h1>
                {categories.map(cat =>
                    <CardFilter id={cat.id} name={cat.name} img={cat.img} />)}
            </div>
            <Link className='link' to='/products'>
                <StyledButton text='Ver catalogo completo'/>
            </Link>
        </div>
    )
}
