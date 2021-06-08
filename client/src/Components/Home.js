import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTest } from '../actions/actions.js';
import { ProductCard } from './ProductCard/ProductCard.js';

export function Home() {
    const text = useSelector((state) => state.test)
    const dispatch = useDispatch();
    const [newText, setNewText] = React.useState('');

    function onChangeText(e) {
        setNewText(e.target.value)
    };

  return (
    <div>
      <ProductCard
        id = {1}
        name = {'Aretes A105'}
        price = {20000}
        image = {'https://i.ibb.co/TP0L9w9/aretes-kmora.png'}
      />
    </div>
  );
};