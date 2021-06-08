import React from 'react'
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { Home } from './Components/Home';
import Nav from './Components/Nav/Nav';
import FormularioAgregarCategoria from "./Components/FormularioAgregarCategoria"

function App() {
  return (
    <div className="App">
      <Nav />
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path="/agregarcategoria/" component={FormularioAgregarCategoria}/>
      </Switch>
    </div>
  );
}

export default App;
