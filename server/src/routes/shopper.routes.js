import express from 'express';
import { updateOrderStatus } from '../controller/order.controller.js';
import { getShopperProfile } from '../controller/shopper.controller.js';
import { verifyToken } from '../middleware/authJwt.js';

const shopperRoutes = express.Router();

shopperRoutes.get('/api/v1/shopper/auth/get-profiles', verifyToken, getShopperProfile);
shopperRoutes.put('/api/v1/shopper/auth/updateOrder', verifyToken, updateOrderStatus);

export default shopperRoutes;
