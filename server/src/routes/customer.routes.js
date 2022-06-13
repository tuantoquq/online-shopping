import express from 'express';
import { getCustomerProfile } from '../controller/customer.js';
import { addCartItems } from '../controller/cartItems.js';
import { verifyToken } from '../middleware/authJwt.js';

const customerRoutes = express.Router();

customerRoutes.get('/api/v1/customer/auth/get-profiles', verifyToken, getCustomerProfile);
customerRoutes.post('/api/v1/customer/auth/cart/add', verifyToken, addCartItems);
export default customerRoutes;
