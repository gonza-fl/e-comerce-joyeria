import React from 'react'
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { Home } from './Components/Home';
import Nav from './Components/Nav/Nav';
import AddCategoryForm from "./Components/AddCategoryForm"
import Catalogue from "./Components/Catalogue/Catalogue"
import Product from './Components/Product/Product';
import CreateProduct from "./Components/CreateProduct/CreateProduct"

function App() {
  return (
    <div className="App">
      <Nav />
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path="/addcategory/" component={AddCategoryForm}/>
        <Route exact path="/createProduct/" component={ CreateProduct }/>
        <Route path='/products' component={Catalogue}/>
        <Route path='/products/:id' render={({match}) => <Product match={match}/>}/>
      </Switch>
    </div>
  );
}

export default App;
