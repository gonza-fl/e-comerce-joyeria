import React from 'react';
import { Link } from 'react-router-dom';
import './CardFilter.css'
import StyledButton from '../../../StyledComponents/Button';


export default function CardFilter({ id, name, img }) {

    return (
        <div>
            <div>
                <img src={img} alt={name} />
            </div>
            <Link to={'/products'}>
                <StyledButton text={name} />
            </Link>
        </div>
    )
}