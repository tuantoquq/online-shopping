import express from 'express';
import { changePassword, changeRequestShopperStatus, getListShopperWithStatus, onOffBlockUser } from '../controller/admin.controller.js';
import { verifyToken,  } from '../middleware/authJwt.js';


const adminRoutes = express.Router();

adminRoutes.post('/api/v1/admin/auth/on-off-block-user', verifyToken, onOffBlockUser);
adminRoutes.get('/api/v1/admin/auth/list-shopper-state', verifyToken, getListShopperWithStatus);
adminRoutes.post('/api/v1/admin/auth/change-state', verifyToken, changeRequestShopperStatus);
adminRoutes.post('/api/v1/admin/auth/change-password', verifyToken, changePassword);
export default adminRoutes;