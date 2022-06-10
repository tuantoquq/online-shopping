import express from 'express';
import productControler from '../controller/product.js';
import { verifyToken } from '../middleware/authJwt.js';

const productRoutes = express.Router();
productRoutes.post(
<<<<<<< HEAD
    '/api/v1/category/insert',
=======
    '/api/v1/product/insert',
>>>>>>> fix bug
    verifyToken,
    productControler.insertProductToDatabase,
);
productRoutes.get(
<<<<<<< HEAD
    '/api/v1/category/get',
=======
    '/api/v1/product/get',
>>>>>>> fix bug
    verifyToken,
    productControler.getProductFromDatabase,
);
productRoutes.post(
<<<<<<< HEAD
    '/api/v1/category/delete',
=======
    '/api/v1/product/delete',
>>>>>>> fix bug
    verifyToken,
    productControler.deleteProductFromDatabse,
);
productRoutes.post(
<<<<<<< HEAD
    '/api/v1/category/update',
=======
    '/api/v1/product/update',
>>>>>>> fix bug
    verifyToken,
    productControler.updateProductFromDatabase,
);

productRoutes.get(
    '/api/v1/product/search',
    verifyToken,
    productControler.search
)
export default productRoutes;
