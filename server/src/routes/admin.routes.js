import express from 'express';
import { blockUser, changeRequestShopperStatus, getListShopperWithStatus } from '../controller/admin.controller.js';
import { verifyToken,  } from '../middleware/authJwt.js';


const adminRoutes = express.Router();

adminRoutes.post('/api/v1/admin/auth/block-user', verifyToken, blockUser);
adminRoutes.get('/api/v1/admin/auth/list-shopper-state', verifyToken, getListShopperWithStatus);
adminRoutes.post('/api/v1/admin/auth/change-state', verifyToken, changeRequestShopperStatus);

export default adminRoutes;