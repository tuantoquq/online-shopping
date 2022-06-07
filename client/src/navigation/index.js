<<<<<<< HEAD
import { Routes, Route, Link } from 'react-router-dom';
import UserInformation from '../screens/UserInformation';
import OrderHistory from '../screens/OrderHistory';
import Order from '../screens/Cart';
=======
import { Routes, Route, Link } from "react-router-dom";

import UserInformation from "../screens/UserInformation";
import OrderHistory from "../screens/OrderHistory";
import Order from "../screens/Cart";
>>>>>>> 76ed5aeb968347984811064e8d8dea452f7dc6d5
import Home from '../screens/home';
import CommentProduct from '../screens/commentProduct';
import Login from '../screens/login';
import Register from '../screens/register';
<<<<<<< HEAD
import Cart from '../screens/Cart';
import Search from '../screens/search';
=======
import Cart from "../screens/Cart";
import AcceptOrder from "../screens/seller_acceptOrder";
import DeliveringOrder from "../screens/seller_deliveringOrder";
import RejectOrder from "../screens/seller_rejectOrder";
import DeliveredOrder from "../screens/seller_deliveredOrder";
>>>>>>> 76ed5aeb968347984811064e8d8dea452f7dc6d5

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
      <Route path="/admin/login" element={<Login role="admin" />} />
      <Route path="/customer/register" element={<Register role="customer" />} />
      <Route path="/shopper/register" element={<Register role="shopper" />} />
      <Route path="/admin/register" element={<Register role="admin" />} />
      <Route path="/search" element={<Search searchTerm="" />} />
      <Route path="/user" element={<UserInformation />} />
      <Route path="/orderhistory" element={<OrderHistory />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );

}

export default RootRoutes;
