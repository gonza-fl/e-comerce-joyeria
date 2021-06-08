import React from 'react'
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { Home } from './Components/Home';
import Nav from './Components/Nav/Nav';
<<<<<<< HEAD
import FormularioAgregarCategoria from "./Components/FormularioAgregarCategoria"
=======
import{Catalogo} from "./Components/Catalogo/Catalogo";
import Product from './Components/Product/Product';
>>>>>>> bdd2f0e3dcf6769fe4d09f41faca09c924046012

function App() {
  return (
    <div className="App">
      <Nav />
      <Switch>
        <Route exact path='/' component={Home}/>
<<<<<<< HEAD
        <Route exact path="/agregarcategoria/" component={FormularioAgregarCategoria}/>
=======
        <Route path='/products' component={Catalogo}/>
        <Route path='/products/:id' render={({match}) => <Product match={match}/>}/>
>>>>>>> bdd2f0e3dcf6769fe4d09f41faca09c924046012
      </Switch>
    </div>
  );
}

export default App;
