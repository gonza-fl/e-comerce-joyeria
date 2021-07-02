import React, { useState, useEffect } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import AdminNavBar from './AdminNavBar/AdminNavBar';
import AdminProducts from './AdminProducts/AdminProducts';
import AdminStatistics from './AdminStatistics/AdminStatistics';
import OrderList from './OrderList/OrderList';
import AdminProductCard from './AdminProducts/AdminProductCard';
import OrderDetail from './OrderList/OrderDetail/OrderDetail';
import AdminControlCategories from './AdminCategories/AdminControlCategories';
import AdminCreateProduct from './AdminProducts/AdminCreateProduct';
import Spiner from '../Spiner/Spiner';
import AdminUpdateProduct from './AdminProducts/AdminUpdateProduct';
import AdminUsers from './AdminUsers/AdminUsers';
import Logo from '../StyledComponents/Logo';
import './adminWindow.css';
import AdminFlyers from './AdminFlyers/AdminFlyers';

function AdminWindow() {
  const user = useSelector((state) => state.user);
  const [userData, setUserData] = useState({ role: '' });
  // maxi modifico esto, si hizo una cagada no es culpa de el...
  useEffect(() => {
    if (user.id && userData.role === '') {
      axios.get(`http://localhost:3001/api/user/${user.id}`)
        .then((res) => setUserData(res.data));
    }
  }, [user]);
  if (userData.role === 'admin' || userData.role === 'superAdmin') {
    return (
      <div className="mainDiv">
        <h1 className="titulo">ADMINISTRADOR</h1>

        <div className="adminPanel">
          <AdminNavBar />
          <div className="windowDiv bg-color-six">
            <Switch>
              <Route exact path="/admin">
                <div className="loggo">
                  <Logo height="800px" width="1000px" />
                </div>
              </Route>
              <Route exact path="/admin/orders" component={OrderList} />
              <Route exact path="/admin/products" component={AdminProducts} />
              <Route exact path="/admin/products/create" component={AdminCreateProduct} />
              <Route exact path="/admin/products/:productId" component={AdminProductCard} />
              <Route exact path="/admin/products/edit/:productId" component={AdminUpdateProduct} />
              <Route exact path="/admin/controlcategories" component={AdminControlCategories} />
              <Route exact path="/admin/createproduct" component={AdminCreateProduct} />
              <Route exact path="/admin/statistics" component={AdminStatistics} />
              <Route exact path="/admin/orders/:orderId" component={OrderDetail} />
              <Route exact path="/admin/users" component={AdminUsers} />
              <Route exact path="/admin/flyers" component={AdminFlyers} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mainDiv">
      <Spiner msg="Debe iniciar sesión para acceder al panel de administrador" />
      <Link to="/">
        <button type="button">volver al home</button>
      </Link>
    </div>
  );
}

export default AdminWindow;
