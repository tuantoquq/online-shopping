import express from 'express';
import {
    registerCustomer,
    loginCustomer,
    registerShopper,
    loginShopper,
    loginAdmin,
    registerAdmin,
    refreshTokenForCustomer,
    refreshTokenForAdmin,
    refreshTokenForShopper,
} from '../controller/auth.controller.js';
import {
    validateLoginCustomerAndShopper,
    validateRegister,
    validateAdmin,
} from '../middleware/validator.js';
import { verifyRefreshToken } from '../middleware/authJwt.js';

const authRoutes = express.Router();

//customer
authRoutes.post('/api/v1/customer/register', validateRegister, registerCustomer);
authRoutes.post('/api/v1/customer/login', validateLoginCustomerAndShopper, loginCustomer);
authRoutes.post(
    '/api/v1/customer/refresh-token',
    verifyRefreshToken,
    refreshTokenForCustomer,
);

//shopper
authRoutes.post('/api/v1/shopper/register', validateRegister, registerShopper);
authRoutes.post('/api/v1/shopper/login', validateLoginCustomerAndShopper, loginShopper);
authRoutes.post(
    '/api/v1/shopper/refresh-token',
    verifyRefreshToken,
    refreshTokenForShopper,
);

//admin
authRoutes.post('/api/v1/admin/register', validateAdmin, registerAdmin);
authRoutes.post('/api/v1/admin/login', validateAdmin, loginAdmin);
authRoutes.post('/api/v1/admin/refresh-token', verifyRefreshToken, refreshTokenForAdmin);
export default authRoutes;
