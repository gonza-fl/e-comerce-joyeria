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
import ModalCreatProductos from "./Components/CreateProduct/modalCreateProducts/ModalCreateProducts.jsx";
import AdminWindow from './Components/Admin/AdminWindow';
function App() {
  return (
    <div className="App font-color-seven">
      <Nav />
      <div className='app-content'>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path="/admin/addcategory" component={AddCategoryForm}/> 
        <Route exact path="/admin" component={AdminWindow}/> 
        <Route path='/products/:id' render={({match}) => <Product match={match}/>}/>
        <Route path='/products' component={Catalogue}/>
      </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
