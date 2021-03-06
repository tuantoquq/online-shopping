import express from 'express';
import {
    cancelOrder,
    getCustomerProfile,
    updateAvatar,
    getAllCustomer
} from '../controller/customer.controller.js';
import { updateInforCustomer } from '../controller/auth.controller.js';
import { verifyToken } from '../middleware/authJwt.js';
import { getShopInfo } from '../controller/shop.controller.js';
import multer from 'multer';
import { storage } from '../middleware/uploadFile.js';

const customerRoutes = express.Router();
const upload = multer({ storage: storage });

customerRoutes.get('/api/v1/customer/auth/get-profiles', verifyToken, getCustomerProfile);
customerRoutes.post('/api/v1/customer/auth/cancel-order', verifyToken, cancelOrder);
customerRoutes.post('/api/v1/customer/auth/update', verifyToken, updateInforCustomer);
customerRoutes.get('/api/v1/customer/shop-info', getShopInfo);
customerRoutes.get('/api/v1/customer/getall', getAllCustomer)
customerRoutes.put(
    '/api/v1/customer/auth/update-avatar',
    [upload.single('file'), verifyToken],
    updateAvatar,
);
export default customerRoutes;
