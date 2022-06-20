import { Routes, Route, Link } from 'react-router-dom';
import UserInformation from '../screens/UserInformation';
import OrderHistory from '../screens/OrderHistory';
import Home from '../screens/home';
import CommentProduct from '../screens/commentProduct';
import Login from '../screens/login';
import Register from '../screens/register';
import ProductInformation from '../components/product';
import OrderUserManager from '../components/OrderUserManager';
import Cart from '../screens/Cart';
import Search from '../screens/search';
import AcceptOrder from '../screens/sellerAcceptOrder';
import DeliveringOrder from '../screens/sellerDeliveringOrder';
import RejectOrder from '../screens/sellerRejectOrder';
import DeliveredOrder from '../screens/sellerDeliveredOrder';
import StatisticOrder from '../screens/adminStatisticOrder';
import AdminDashboard from '../screens/adminDashboard';
import CustomersList from '../screens/customersList';
import StatisticRevenue from '../screens/adminStatisticRevenue';
import ShopHome from '../components/shopHome';
import ProductManager from '../components/productManager';

function RootRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/comment" element={<CommentProduct />} />

      <Route path="/shopper/accept-order" element={<AcceptOrder />} />
      <Route path="/shopper/delivering-order" element={<DeliveringOrder />} />
      <Route path="/shopper/reject-order" element={<RejectOrder />} />
      <Route path="/shopper/delivered-order" element={<DeliveredOrder />} />

      <Route path="/customer/login" element={<Login role="customer" />} />
      <Route path="/shopper/login" element={<Login role="shopper" />} />
      <Route path="/admin/login" element={<Register role="admin" />} />

      <Route path="/customer/register" element={<Register role="customer" />} />
      <Route path="/shopper/register" element={<Register role="shopper" />} />
      <Route path="/search" element={<Search searchTerm="" />} />
      <Route
        path="/user/infomation"
        element={<UserInformation role="user" />}
      />
      <Route
        path="/admin/infomation"
        element={<UserInformation role="admin" />}
      />
      <Route path="/search" element={<Search search="keycap" />} />
      <Route path="/user" element={<UserInformation />} />
      <Route path="/orderhistory" element={<OrderHistory />} />
      <Route path="/cart" element={<Cart />} />

      <Route path="/ProductTest" element={<ProductInformation />} />
      <Route path="/testShop" element={<ShopHome />} />
      <Route path="/vay" element={<OrderUserManager />} />
      <Route path="/ProductManager" element={<ProductManager />} />

      <Route path="/admin/login" element={<Login role="admin" />} />
      <Route path="/admin" element={<AdminDashboard />} />

      <Route path="/admin/statistic-order" element={<StatisticOrder />} />
      <Route path="/admin/statistic-revenue" element={<StatisticRevenue />} />
      <Route path="/admin/customers" element={<CustomersList />} />
    </Routes>
  );
}

export default RootRoutes;
