import express from 'express';
import productController from '../controller/product.controller.js';
import { verifyToken } from '../middleware/authJwt.js';

const productRoutes = express.Router();
productRoutes.post(
    '/api/v1/product/insert',
    verifyToken,
    productController.insertProductToDatabase,
);
productRoutes.get('/api/v1/product/get', productController.getProductFromDatabase);
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
productRoutes.get('/api/v1/product/filter', productController.filter);
productRoutes.get(
    '/api/v1/product/top-6-selling',
    productController.getTop6SellingProduct,
);
productRoutes.get(
    '/api/v1/product/top-30-recommend',
    productController.getTop30RecommendProducts,
);

export default productRoutes;
