import React from 'react';
import { Link } from 'react-router-dom';
import './CardFilter.css'


export default function CardFilter({id, name, img}){

    return (
        <div>
            <div>
                <p>{name}</p>
            </div>
            <Link to={'#'+id}> 
                <img src={img} alt={name} />
            </Link>
        </div>
    )
}