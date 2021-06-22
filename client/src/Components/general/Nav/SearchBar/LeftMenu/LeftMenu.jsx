import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './LeftMenu.css';

export default function LeftMenu() {
  const categories = useSelector((state) => state.categories);

  return (
    <div className="leftMenuCtn">
      <ul>
        CATEGORIAS
        <div className="bg-color-six">
          {categories.map((d) => (
            <Link to={`/products/${d.id}`} key={d.name}>
              <li className="optionLeftMenu">{d.name.toUpperCase()}</li>
            </Link>
          ))}
        </div>
      </ul>
      <ul>TIPS</ul>
      <ul>ARTE</ul>
      <ul>NUEVO</ul>
    </div>
  );
}
