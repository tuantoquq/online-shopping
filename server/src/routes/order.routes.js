import express from 'express';
import { addOrder, getListOrderByCustomerWithOptionStatus } from '../controller/order.controller.js';
import { verifyToken } from '../middleware/authJwt.js';


const orderRoutes = express.Router();

orderRoutes.post('/api/v1/customer/auth/orders', verifyToken, addOrder);
orderRoutes.get('/api/v1/customer/auth/orders', verifyToken, getListOrderByCustomerWithOptionStatus);
export default orderRoutes;