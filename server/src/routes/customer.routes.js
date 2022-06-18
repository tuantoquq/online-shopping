import express from 'express';
import { getCustomerProfile } from '../controller/customer.js';
import { verifyToken } from '../middleware/authJwt.js';

const customerRoutes = express.Router();

customerRoutes.get('/api/v1/customer/auth/get-profiles', verifyToken, getCustomerProfile);
export default customerRoutes;
