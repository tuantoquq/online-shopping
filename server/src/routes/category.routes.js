import express from 'express';
import categoryController from '../controller/category.js';
import { verifyToken } from '../middleware/authJwt.js';

const categoryRoutes = express.Router();
categoryRoutes.post(
    '/api/v1/category/insert',
    verifyToken,
    categoryController.insertCategoryToDatabase,
);
categoryRoutes.get(
    '/api/v1/category/get',
    categoryController.getCategoryFromDatabase,
);
categoryRoutes.post(
    '/api/v1/category/delete',
    verifyToken,
    categoryController.deleteCategoryFromDatabase,
);
categoryRoutes.post(
    '/api/v1/category/update',
    verifyToken,
    categoryController.updateCategoryFromDatabase,
);

export default categoryRoutes;
