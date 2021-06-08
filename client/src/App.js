import React from 'react'
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { Home } from './Components/Home';
import Nav from './Components/Nav/Nav';

function App() {
  return (
    <div className="App">
      <Nav />
      <Switch>
        <Route path='/' component={Home}/>
      </Switch>
    </div>
  );
}

export default App;
