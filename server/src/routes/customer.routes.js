import express from 'express';
import { cancelOrder, getCustomerProfile } from '../controller/customer.controller.js';
import { updateInforCustomer } from '../controller/auth.controller.js';
import { verifyToken } from '../middleware/authJwt.js';
import { updateInforCustomer } from '../controller/auth.js';

const customerRoutes = express.Router();

customerRoutes.get('/api/v1/customer/auth/get-profiles', verifyToken, getCustomerProfile);
customerRoutes.post('/api/v1/customer/auth/cancel-order', verifyToken, cancelOrder);
<<<<<<< HEAD
customerRoutes.post('/api/v1/customer/auth/update', verifyToken, updateInforCustomer);
=======
customerRoutes.post('/api/v1/customer/update', verifyToken, updateInforCustomer)
>>>>>>> fix search engine
export default customerRoutes;
