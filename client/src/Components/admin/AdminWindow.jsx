import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import AdminNavBar from './AdminNavBar/AdminNavBar';
import AdminProducts from './AdminProducts/AdminProducts';
import AdminStatistics from './AdminStatistics/AdminStatistics';
import OrderList from './OrderList/OrderList';
import AdminProductCard from './AdminProducts/AdminProductCard';
import OrderDetail from './OrderList/OrderDetail/OrderDetail';
import AdminControlCategories from './AdminCategories/AdminControlCategories';
import AdminCreateProduct from './CreateProduct/AdminCreateProduct';
import Spiner from '../Spiner/Spiner';

const ADMIN_IDS = process.env.REACT_APP_ADMIN_IDS;

function AdminWindow() {
  ADMIN_IDS.split(',');
  const user = useSelector((state) => state.user);
  if (ADMIN_IDS.includes(user.id)) {
    return (
      <MainDiv>
        <h1>ADMINISTRADOR</h1>

        <AdminPanel>
          <AdminNavBar />
          <WindowDiv className="bg-color-six">
            <Switch>
              <Route exact path="/admin/orders" component={OrderList} />
              <Route exact path="/admin/products" component={AdminProducts} />
              <Route exact path="/admin/products/:productId" component={AdminProductCard} />
              <Route exact path="/admin/controlcategories" component={AdminControlCategories} />
              <Route exact path="/admin/createproduct" component={AdminCreateProduct} />
              <Route exact path="/admin/statistics" component={AdminStatistics} />
              <Route exact path="/admin/orders/:orderId" component={OrderDetail} />
            </Switch>
          </WindowDiv>
        </AdminPanel>
      </MainDiv>
    );
  }

  return (
    <MainDiv>
      <Spiner msg="Debe iniciar secion para acceder al panel de administrador" />
      <Link to="/">
        <button type="button">volver al home</button>
      </Link>
    </MainDiv>
  );
}

const MainDiv = styled.div`
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      height: 97vh;
`;

const AdminPanel = styled.div`
      display: flex;
      flex-direction: row;
      width: 98vw;
      height: 100%;
      padding 15px 15px;
`;

const WindowDiv = styled.div`
      display: flex;
      justify-content: center;
      flex-grow: 8;
      align-items: center;
`;

export default AdminWindow;
