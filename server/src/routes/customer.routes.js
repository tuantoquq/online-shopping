import express from 'express';
import { cancelOrder, getCustomerProfile } from '../controller/customer.controller.js';
import { updateInforCustomer } from '../controller/auth.controller.js';
import { verifyToken } from '../middleware/authJwt.js';
import { updateInforCustomer } from '../controller/auth.js';

const customerRoutes = express.Router();

customerRoutes.get('/api/v1/customer/auth/get-profiles', verifyToken, getCustomerProfile);
customerRoutes.post('/api/v1/customer/auth/cancel-order', verifyToken, cancelOrder);
customerRoutes.post('/api/v1/customer/update', verifyToken, updateInforCustomer);
customerRoutes.post('/api/v1/customer/update', verifyToken, updateInforCustomer);
export default customerRoutes;
