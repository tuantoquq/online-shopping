import express from 'express';
import { updateOrderStatus } from '../controller/order.controller.js';
import { getShopperProfile, updateAvatar, getAllShopperWithState, getShopInformationOfShopper, getAllOrderWithStatus} from '../controller/shopper.controller.js';
import { verifyToken } from '../middleware/authJwt.js';
import multer from 'multer';
import { storage } from '../middleware/uploadFile.js';
import { addNewShop } from '../controller/shop.controller.js';
import { updateInforShopper } from '../controller/auth.controller.js';

const shopperRoutes = express.Router();
const upload = multer({ storage: storage });
shopperRoutes.get('/api/v1/shopper/auth/get-profiles', verifyToken, getShopperProfile);
shopperRoutes.put('/api/v1/shopper/auth/updateOrder', verifyToken, updateOrderStatus);
shopperRoutes.put(
    '/api/v1/shopper/auth/update-avatar',
    [upload.single('file'), verifyToken],
    updateAvatar,
);
shopperRoutes.put('/api/v1/shopper/auth/update-profile', verifyToken, updateInforShopper);   
shopperRoutes.post('/api/v1/shopper/auth/add-shop', verifyToken, addNewShop);
shopperRoutes.get('/api/v1/shopper/get-shopper-with-state', getAllShopperWithState)
shopperRoutes.get('/api/v1/shopper/auth/shop-info', verifyToken, getShopInformationOfShopper);
shopperRoutes.get('/api/v1/shopper/auth/list-order', verifyToken, getAllOrderWithStatus);
export default shopperRoutes;
