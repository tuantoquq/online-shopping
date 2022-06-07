import express from 'express';
import productControler from '../controller/product.js';

const productRoutes = express.Router();
productRoutes.post(
    '/api/v1/category/insert',
    verifyToken,
    productControler.insertProductToDatabase,
);
productRoutes.get(
    '/api/v1/category/get',
    verifyToken,
    productControler.getProductFromDatabase,
);
productRoutes.post(
    '/api/v1/category/delete',
    verifyToken,
    productControler.deleteProductFromDatabse,
);
productRoutes.post(
    '/api/v1/category/update',
    verifyToken,
    productControler.updateProductFromDatabase,
);

export default productRoutes;
