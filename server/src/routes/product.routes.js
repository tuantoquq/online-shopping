import express from 'express';
import productController from '../controller/product.js';
import { verifyToken } from '../middleware/authJwt.js';

const productRoutes = express.Router();
productRoutes.post(
    '/api/v1/product/insert',
    verifyToken,
    productController.insertProductToDatabase,
);
productRoutes.get(
    '/api/v1/product/get',
    verifyToken,
    productController.getProductFromDatabase,
);
productRoutes.post(
    '/api/v1/product/delete',
    verifyToken,
    productController.deleteProductFromDatabase,
);

productRoutes.post(
    '/api/v1/product/update',
    verifyToken,
    productController.updateProductFromDatabase,
);

productRoutes.get('/api/v1/product/search', productController.search);
productRoutes.get('/api/v1/product/filter', productController.filter)

export default productRoutes;
