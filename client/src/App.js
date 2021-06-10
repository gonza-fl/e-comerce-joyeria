import React from 'react'
import './App.css';
import './colors.css';
import { Route, Switch } from 'react-router-dom';
import { Home } from './Components/Home';
import Nav from './Components/Nav/Nav';
import AddCategoryForm from "./Components/AddCategoryForm"
import Catalogue from "./Components/Catalogue/Catalogue"
import Product from './Components/Product/Product';
import CreateProduct from "./Components/CreateProduct/CreateProduct"
import { Footer } from './Components/Footer/Footer';

function App() {
  return (
    <div className="App font-color-seven">
      <Nav />
      <div className='app-content'>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path="/addcategory/" component={AddCategoryForm}/> 
        <Route exact path="/createProduct/" component={ CreateProduct }/>
        <Route path='/products' component={Catalogue}/>
        <Route path='/products/:id' render={({match}) => <Product match={match}/>}/>
      </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
