import express from 'express';
import deliveryControler from '../controller/deliveryAddress.js';
import { verifyToken } from '../middleware/authJwt.js';

const deliverRoutes = express.Router();
deliverRoutes.post(
    '/api/v1/delivery/insert',
    verifyToken,
    deliveryControler.insertToDatabase,
);
deliverRoutes.get(
    '/api/v1/delivery/get',
    verifyToken,
    deliveryControler.getDeliveryFromDatabase,
);
deliverRoutes.post(
    '/api/v1/delivery/delete',
    verifyToken,
    deliveryControler.deleteDeliveryFromDatabse,
);
deliverRoutes.post(
    '/api/v1/delivery/update',
    verifyToken,
    deliveryControler.updateDeliveryFromDatabase,
);
export default deliverRoutes;
