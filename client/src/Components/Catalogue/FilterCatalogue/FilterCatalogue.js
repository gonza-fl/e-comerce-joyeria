import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './FilterCatalogue.css';
import StyledButton from '../../../StyledComponents/Button';
import ReactStars from "react-rating-stars-component";


export default function FilterCatalogue({ products }) {

    const handleClick = (e) => {
        console.log(e.target.innerText);

    }

    return (
        <div>
            <h1>{products.length} Resultados</h1>
            <h3>Ver:</h3>
            <h5>Alfabeticamente</h5>
            <StyledButton text={'A-Z'} handleClick={handleClick} />
            <StyledButton text={'Z-A'} handleClick={handleClick} />
            <hr></hr>

            <h5>Precio</h5>
            <StyledButton text={'Mayor'} handleClick={handleClick} />
            <StyledButton text={'Menor'} handleClick={handleClick} />
            <form>
                <input placeholder='Minimo..'></input>
                <span>-</span>
                <input placeholder='Maximo'></input>
                <input type='submit' value='>'></input>
            </form>
            <hr></hr>

            <h5>Estrellas</h5>
            <span>Mas Estrellas</span>
            <ReactStars count={5} size={24} edit={false} value={5} activeColor="#ffd700" />
            <span>Menos Estrellas</span>
            <ReactStars count={5} size={24} edit={false} value={1} activeColor="#ffd700" />
            <span>Elegir</span>
            <ReactStars count={5} size={24} onChange={()=>alert()} value={1} activeColor="#ffd700" />
            <hr></hr>

        </div>
    )
}