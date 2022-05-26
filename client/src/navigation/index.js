import { Routes, Route } from 'react-router-dom';
import Home from '../screens/home';
import Login from '../screens/login';
import Register from '../screens/register';

function RootRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/customer/login" element={<Login role="customer" />} />
      <Route path="/shopper/login" element={<Login role="shopper" />} />
      <Route path="/admin/login" element={<Login role="admin" />} />
      <Route path="/customer/register" element={<Register role="customer" />} />
      <Route path="/shopper/register" element={<Register role="shopper" />} />
    </Routes>
  );
}

export default RootRoutes;
