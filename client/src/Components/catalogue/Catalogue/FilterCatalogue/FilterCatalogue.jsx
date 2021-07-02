/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */

import React, { useEffect, useState } from 'react';
import './FilterCatalogue.css';
import ReactStars from 'react-rating-stars-component';
import StyledButton from '../../../StyledComponents/Button';
import {
  sortAscending, sortDescending, sortNameAsc, sortNameDesc, sortStarAscending, sortStarDescending,
} from './utils/sorts';
import { findByPrice, findByStars } from './utils/finds';

export default function FilterCatalogue({
  products, setProducts, productsGlobal, total,
}) {
  const [input, setInput] = useState({ min: '', max: '' });
  const [undo, setUndo] = useState(false);

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    document.getElementById('submit').disabled = (!input.min || !input.max || !Number(input.min) || !Number(input.max));
  }, [input]);

  const handleChoise = (e) => {
    if (typeof e === 'number') { setProducts([...findByStars(products, e)]); } else {
      e.preventDefault();
      setProducts([...findByPrice(products, input.max, input.min)]);
    }
    setUndo(true);
  };

  return (
    <div className="ctnFiltersCat">
      {undo && <div className="undo"><StyledButton text="Deshacer" handleClick={() => { setProducts([...productsGlobal]); setUndo(false); }} /></div>}
      <h1>{`${total} Resultados`}</h1>
      <h3>Ver </h3>
      <h5>Alfabéticamente</h5>
      <p onClick={() => { setProducts([...sortNameAsc(products)]); setUndo(true); }}>A-Z</p>
      <p onClick={() => { setProducts([...sortNameDesc(products)]); setUndo(true); }}>Z-A</p>

      <h5>Precio</h5>
      <p onClick={() => { setProducts([...sortDescending(products, 'price')]); setUndo(true); }}>Mayor</p>
      <p onClick={() => { setProducts([...sortAscending(products, 'price')]); setUndo(true); }}>Menor</p>

      <form onSubmit={handleChoise}>
        <input name="min" placeholder="Mínimo..." onChange={handleInputChange} />
        <span>-</span>
        <input name="max" placeholder="Máximo..." onChange={handleInputChange} />
        <input id="submit" type="submit" value=">" disabled />
      </form>

      <h5>Estrellas</h5>
      <div className="stars" onClick={() => { setProducts([...sortStarDescending(products)]); setUndo(true); }} role="none">
        Mas Estrellas
        <ReactStars count={5} size={20} edit={false} value={5} activeColor="#ffd700" />

      </div>

      <div className="stars" onClick={() => { setProducts([...sortStarAscending(products)]); setUndo(true); }} role="none">
        Menos Estrellas
        <ReactStars count={5} size={20} edit={false} value={2} activeColor="#ffd700" />

      </div>

      <span>Elegir</span>
      <ReactStars
        count={5}
        size={20}
        value={0}
        activeColor="#ffd700"
        onChange={handleChoise}
      />

    </div>
  );
}
