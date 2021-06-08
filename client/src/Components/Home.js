import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTest } from '../actions/actions.js';

export function Home() {
    const text = useSelector((state) => state.test)
    const dispatch = useDispatch();
    const [newText, setNewText] = React.useState('');

    function onChangeText(e) {
        setNewText(e.target.value)
    };

  return (
    <div>
      <h1>{text}</h1>
      <input onChange={(e) => onChangeText(e)}/><br/>
      <button onClick = {() => dispatch(setTest(newText))}>Click on me</button>
    </div>
  );
};