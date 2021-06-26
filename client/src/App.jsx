/* eslint-disable import/no-cycle */
/* eslint-disable react/button-has-type */
import React from 'react';
import './App.css';
import './colors.css';
import { Route, Switch } from 'react-router-dom';
import firebase from 'firebase/app';
import { useDispatch } from 'react-redux';
import Home from './Components/home/Home';
import Nav from './Components/general/Nav/Nav';
import Catalogue from './Components/catalogue/Catalogue/Catalogue';
import Product from './Components/catalogue/Product/Product';
import Footer from './Components/general/Footer/Footer';
import AdminWindow from './Components/admin/AdminWindow';
import CategoryCatalogue from './Components/catalogue/CategoryCatalogue/CategoryCatalogue';
import UserCreate from './Components/user/UserCreate/UserCreate';
import Cart from './Components/cart/Cart/Cart';
import Profile from './Components/user/Profile/Profile';
import 'firebase/auth';
import { setUser } from './redux/actions/actions';
import CartCheckout from './Components/cart/CartCheckout/CartCheckout';
import UserOrders from './Components/user/UserOrders/UserOrders';
import UserOrderDetail from './Components/user/UserOrders/UserOrderDetail/UserOrderDetail';
import CreateUpdateReview from './Components/user/UserOrders/UserOrderDetail/CreateUpdateReview/CreateUpdateReview';

function App() {
  const dispatch = useDispatch();

  firebase.auth().onAuthStateChanged((user) => {
    dispatch(setUser(user));
  });

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
              <Route exact path="/cart" component={Cart} />
              <Route path="/account/register" component={UserCreate} />
              <Route path="/account/profile" component={Profile} />
              <Route path="/cart/checkout" component={CartCheckout} />
              <Route path="/user/:userId/orders" component={UserOrders} />
              <Route path="/user/order/:orderId" component={UserOrderDetail} />
              <Route path="/user/review/product/:productId/:userId" component={CreateUpdateReview} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Switch>
    </div>
  );
}

export default App;
