import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import ModalCreatProductos from './CreateProduct/modalCreateProducts/ModalCreateProducts';
import AdminNavBar from './AdminNavBar/AdminNavBar';
import AddCategoryForm from './AddCategoryForm';
import AdminProducts from './AdminProducts/AdminProducts';
import AdminStatistics from './AdminStatistics/AdminStatistics';
import OrderList from './OrderList/OrderList';
import AdminProductCard from './AdminProducts/AdminProductCard';
import OrderDetail from './OrderList/OrderDetail/OrderDetail';

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
            <Route exact path="/admin/addcategory" component={AddCategoryForm} />
            <Route exact path="/admin/createproduct" component={ModalCreatProductos} />
            <Route exact path="/admin/statistics" component={AdminStatistics} />
            <Route exact path="/admin/orderdetail" component={OrderDetail} />
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
