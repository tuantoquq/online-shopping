import express from 'express';
import { getCustomerProfile } from '../controller/customer.js';
import { methodNotAllowed } from '../exception/exceptionHandler.js';
import { verifyToken } from '../middleware/authJwt.js';

const customerRoutes = express.Router();

customerRoutes
    .get('/api/v1/customer/auth/get-profiles', verifyToken, getCustomerProfile)
    .all(methodNotAllowed);

export default customerRoutes;
