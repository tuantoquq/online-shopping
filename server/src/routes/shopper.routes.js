import express from 'express';
import { updateOrderStatus } from '../controller/order.controller.js';
import { getShopperProfile, updateAvatar } from '../controller/shopper.controller.js';
import { verifyToken } from '../middleware/authJwt.js';
import multer from 'multer';
import { storage } from '../middleware/uploadFile.js';
import { addNewShop } from '../controller/shop.controller.js';

const shopperRoutes = express.Router();
const upload = multer({ storage: storage });
shopperRoutes.get('/api/v1/shopper/auth/get-profiles', verifyToken, getShopperProfile);
shopperRoutes.put('/api/v1/shopper/auth/updateOrder', verifyToken, updateOrderStatus);
shopperRoutes.put(
    '/api/v1/shopper/auth/update-avatar',
    [upload.single('file'), verifyToken],
    updateAvatar,
);

shopperRoutes.post('/api/v1/shopper/auth/add-shop', verifyToken, addNewShop);
export default shopperRoutes;
