import React from 'react';
import './App.css';
import './colors.css';
import { Route, Switch } from 'react-router-dom';
import Home from './Components/home/Home';
import Nav from './Components/general/Nav/Nav';
import Catalogue from './Components/catalogue/Catalogue/Catalogue';
import Product from './Components/catalogue/Product/Product';
import Footer from './Components/general/Footer/Footer';
import AdminWindow from './Components/admin/AdminWindow';
import CategoryCatalogue from './Components/catalogue/CategoryCatalogue/CategoryCatalogue';
import UserCreate from './Components/user/UserCreate';

function App() {
  return (
    <div>
      <Switch>
        <Route path="/admin" component={AdminWindow} />
        <div className="App font-color-seven">
          <Nav />
          <div className="app-content">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/products/product/:productId" component={Product} />
              <Route path="/products/:categoryId" component={CategoryCatalogue} />
              <Route path="/products" component={Catalogue} />
              <Route path="/account/register" component={UserCreate} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Switch>
    </div>
  );
}

export default App;
