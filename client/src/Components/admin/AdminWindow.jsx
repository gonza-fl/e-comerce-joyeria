/* eslint linebreak-style: ["error", "windows"] */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import AdminNavBar from './AdminNavBar/AdminNavBar';
import AdminProducts from './AdminProducts/AdminProducts';
import AdminStatistics from './AdminStatistics/AdminStatistics';
import OrderList from './OrderList/OrderList';
import AdminProductCard from './AdminProducts/AdminProductCard';
import OrderDetail from './OrderList/OrderDetail/OrderDetail';
import AdminControlCategories from './AdminCategories/AdminControlCategories';

function AdminWindow() {
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
            <Route exact path="/admin/statistics" component={AdminStatistics} />
            <Route exact path="/admin/orders/:orderId" component={OrderDetail} />
          </Switch>
        </WindowDiv>
      </AdminPanel>
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
