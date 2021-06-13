import React from 'react';
import { Link } from 'react-router-dom';
import './CardFilter.css'
import StyledButton from '../../../StyledComponents/Button';


export default function CardFilter({ id, name, img }) {

    return (
        <div className='ctnCardC'>
            <a href={'/products?' + name}>
                <div className='headerCard'>
                    <img src={img} alt={name} />
                </div>
                <StyledButton text={name} />
            </a>
        </div>
    )
}