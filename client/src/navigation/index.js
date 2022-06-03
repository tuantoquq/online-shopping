import { Routes, Route, Link } from "react-router-dom";
import UserInformation from "../screens/UserInformation";
import OrderHistory from "../screens/OrderHistory";
import Order from "../screens/Order";
import Home from '../screens/home';
import CommentProduct from '../screens/commentProduct';
import Login from '../screens/login';
import Register from '../screens/register';

function RootRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/comment" element={<CommentProduct />} />
      <Route path="/customer/login" element={<Login role="customer" />} />
      <Route path="/shopper/login" element={<Login role="shopper" />} />
      <Route path="/admin/login" element={<Login role="admin" />} />
      <Route path="/customer/register" element={<Register role="customer" />} />
      <Route path="/shopper/register" element={<Register role="shopper" />} />
      <Route path="/admin/register" element={<Register role="admin" />} />
      <Route path="/user" element={<UserInformation />} />
    </Routes>
  );
}

export default RootRoutes;
