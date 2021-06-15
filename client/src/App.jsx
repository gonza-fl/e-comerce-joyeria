import React from 'react';
import './App.css';
import './colors.css';
import { Route, Switch } from 'react-router-dom';
import Home from './Components/home/Home';
import Nav from './Components/general/Nav/Nav';
import AddCategoryForm from './Components/admin/AddCategoryForm';
import Catalogue from './Components/catalogue/Catalogue/Catalogue';
import Product from './Components/catalogue/Product/Product';
import Footer from './Components/general/Footer/Footer';
import AdminWindow from './Components/admin/AdminWindow';
import CategoryCatalogue from './Components/catalogue/CategoryCatalogue/CategoryCatalogue';
import UserCreate from './Components/user/UserCreate';

function App() {
  return (
    <div className="App font-color-seven">
      <Nav />
      <div className="app-content">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/admin/addcategory" component={AddCategoryForm} />
          <Route exact path="/admin" component={AdminWindow} />
          <Route path="/products/product/:productId" component={Product} />
          <Route path="/products/:categoryId" component={CategoryCatalogue} />
          <Route path="/products" component={Catalogue} />
          <Route path="/user/register" component={UserCreate} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
