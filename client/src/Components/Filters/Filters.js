import React, { useEffect, useState } from 'react';
import './Filters.css';
import { categoriesF } from '../fakeDB-Categories';
import CardFilter from './CardFilter/CardFilter';

export default function Filters() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        //posible axios ----> acá <----
        setCategories(categoriesF);
    }, []);

    return (
        <div>
            {categories.map(cat =>
                <CardFilter id={cat.id} name={cat.name} img={cat.img} />)}
        </div>
    )
}
