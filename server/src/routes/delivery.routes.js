import express from 'express';
import deliveryController from '../controller/deliveryAddress.js';
import { verifyToken } from '../middleware/authJwt.js';

const deliverRoutes = express.Router();
deliverRoutes.post(
    '/api/v1/delivery/insert',
    verifyToken,
    deliveryController.insertToDatabase,
);
deliverRoutes.get(
    '/api/v1/delivery/get',
    verifyToken,
    deliveryController.getDeliveryFromDatabase,
);
deliverRoutes.post(
    '/api/v1/delivery/delete',
    verifyToken,
    deliveryController.deleteDeliveryFromDatabase,
);
deliverRoutes.post(
    '/api/v1/delivery/update',
    verifyToken,
    deliveryController.updateDeliveryFromDatabase,
);

export default deliverRoutes;
