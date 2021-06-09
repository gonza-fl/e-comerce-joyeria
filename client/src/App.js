import React from 'react'
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { Home } from './Components/Home';
import Nav from './Components/Nav/Nav';
import FormularioAgregarCategoria from "./Components/FormularioAgregarCategoria"
import Catalogo from "./Components/Catalogo/Catalogo"
import Product from './Components/Product/Product';

function App() {
  return (
    <div className="App">
      <Nav />
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path="/agregarcategoria/" component={FormularioAgregarCategoria}/>
        <Route path='/products' component={Catalogo}/>
        <Route path='/products/:id' render={({match}) => <Product match={match}/>}/>
      </Switch>
    </div>
  );
}

export default App;
