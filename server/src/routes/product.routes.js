import express from 'express';
import {
    addProduct,
    deleteProduct,
    filterProduct,
    getProductById,
    getTop30RecommendProducts,
    getTop6SellingProduct,
    updateProduct,
} from '../controller/product.controller.js';
import { verifyToken } from '../middleware/authJwt.js';
import multer from 'multer';
import { storage } from '../middleware/uploadFile.js';

const productRoutes = express.Router();
const upload = multer({ storage: storage });

productRoutes.get('/api/v1/product/get', getProductById);
productRoutes.delete(
    '/api/v1/product/auth/delete/:productId',
    verifyToken,
    deleteProduct,
);

productRoutes.put(
    '/api/v1/product/auth/update/:productId',
    [upload.array('files'), verifyToken],
    updateProduct,
);

// productRoutes.get('/api/v1/product/search', productController.search);
productRoutes.get('/api/v1/product/filter', filterProduct);
productRoutes.get('/api/v1/product/top-6-selling', getTop6SellingProduct);
productRoutes.get('/api/v1/product/top-30-recommend', getTop30RecommendProducts);
productRoutes.post(
    '/api/v1/shopper/auth/add-product',
    [upload.array('files'), verifyToken],
    addProduct,
);

export default productRoutes;
