import express from 'express';
import { verifyToken } from '../middleware/authJwt.js';
import {
    addCartItems,
    deleteCartItems,
    updateCartItems,
} from '../controller/cartItems.js';

const cartItemsRoutes = express.Router();

cartItemsRoutes.post('/api/v1/customer/auth/cart/add', verifyToken, addCartItems);
cartItemsRoutes.post('/api/v1/customer/auth/cart/update', verifyToken, updateCartItems);
cartItemsRoutes.delete(
    '/api/v1/customer/auth/cart/delete/:cartItemsId',
    verifyToken,
    deleteCartItems,
);
export default cartItemsRoutes;
