import React from 'react';
import { Link } from 'react-router-dom';
import './CardFilter.css'
import StyledButton from '../../../StyledComponents/Button';
import { useDispatch } from 'react-redux';
import { getProdutsByCategory } from '../../../actions/actions';


export default function CardFilter({ id, name, img }) {

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(getProdutsByCategory(id));
    };

    return (
        <div className='ctnCardC' onClick={handleClick}>
            <Link to={'/products'}>
                <div className='headerCard'>
                    <img src={img} alt={name} />
                </div>
                <StyledButton text={name} />
            </Link>
        </div>
    )
}