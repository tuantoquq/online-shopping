import express from 'express';
import { verifyToken } from '../middleware/authJwt.js';
import {
    addCartItems,
    deleteCartItems,
    getAllCartItemsByCustomerId,
    updateCartItems,
} from '../controller/cartItems.controller.js';

const cartItemsRoutes = express.Router();

cartItemsRoutes.post('/api/v1/customer/auth/cart/add', verifyToken, addCartItems);
cartItemsRoutes.put('/api/v1/customer/auth/cart/update', verifyToken, updateCartItems);
cartItemsRoutes.delete(
    '/api/v1/customer/auth/cart/delete/:cartItemsId',
    verifyToken,
    deleteCartItems,
);

cartItemsRoutes.get('/api/v1/customer/auth/cart', verifyToken, getAllCartItemsByCustomerId)
export default cartItemsRoutes;
