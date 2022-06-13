import express from 'express';
import productControler from '../controller/product.js';
import { verifyToken } from '../middleware/authJwt.js';

const productRoutes = express.Router();
productRoutes.post(
    '/api/v1/product/insert',
    verifyToken,
    productControler.insertProductToDatabase,
);
productRoutes.get(
    '/api/v1/product/get',
    verifyToken,
    productControler.getProductFromDatabase,
);
productRoutes.post(
    '/api/v1/product/delete',
    verifyToken,
    productControler.deleteProductFromDatabse,
);
productRoutes.post(
    '/api/v1/product/update',
    verifyToken,
    productControler.updateProductFromDatabase,
);

productRoutes.get('/api/v1/product/search', productControler.search);

export default productRoutes;
