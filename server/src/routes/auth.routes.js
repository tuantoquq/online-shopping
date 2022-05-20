import express from 'express';
import { registerCustomer, loginCustomer } from '../controller/auth.js';
import { methodNotAllowed } from '../exception/exceptionHandler.js';
import { validateLoginCustomerAndShopper, validateRegister } from '../middleware/validator.js';

const authRoutes = express.Router();

authRoutes.post('/api/v1/customer/register', validateRegister, registerCustomer).all(methodNotAllowed);
authRoutes.post('/api/v1/customer/login', validateLoginCustomerAndShopper, loginCustomer).all(methodNotAllowed);

export default authRoutes;