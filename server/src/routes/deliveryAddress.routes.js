import express from 'express';
import {
    addDeliveryAddress,
    getDeliveryAddressById,
    deleteDeliveryAddress,
    updateDeliveryAddress,
} from '../controller/deliveryAddress.controller.js';
import { verifyToken } from '../middleware/authJwt.js';

const deliverAddressRoutes = express.Router();
deliverAddressRoutes.post(
    '/api/v1/customer/auth/delivery-address',
    verifyToken,
    addDeliveryAddress,
);
deliverAddressRoutes.get(
    '/api/v1/customer/auth/delivery-address/:addressId',
    verifyToken,
    getDeliveryAddressById,
);
deliverAddressRoutes.delete('/api/v1/customer/auth/delivery-address/:addressId', verifyToken, deleteDeliveryAddress);
deliverAddressRoutes.put('/api/v1/customer/auth/delivery-address/:addressId', verifyToken, updateDeliveryAddress);

export default deliverAddressRoutes;
