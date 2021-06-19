/* eslint linebreak-style: ["error", "windows"] */
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './ShowCategories.css';
import ShowCatCard from './ShowCatCard/ShowCatCard';
import StyledButton from '../../StyledComponents/Button';

export default function ShowCategories() {
  const categories = useSelector((state) => state.categories);

  return (
    <div className="ctnFilters">
      <div className="ctnCards">
        <h1 className="bg-color-six" style={{ padding: '0px 10px' }}>Nuestras categorías</h1>
        {categories.map((cat) => (
          <ShowCatCard
            key={cat.id}
            id={cat.id}
            name={cat.name}
            img={cat.img}
          />
        ))}
      </div>
      <Link className="link" to="/products">
        <StyledButton text="Ver catalogo completo" />
      </Link>
    </div>
  );
}
