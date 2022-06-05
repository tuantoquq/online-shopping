import express from 'express';
import categoryControler from '../controller/category.js';
import { verifyToken } from '../middleware/authJwt.js';

const categoryRoutes = express.Router()
categoryRoutes.post('/api/v1/category/insert', verifyToken, categoryControler.insertCategoryToDatabase);
categoryRoutes.get('/api/v1/category/get', verifyToken, categoryControler.getCategoryFromDatabase)
categoryRoutes.post('/api/v1/category/delete', verifyToken, categoryControler.deleteCategoryFromDatabse)
categoryRoutes.post('/api/v1/category/update', verifyToken, categoryControler.updateCategoryFromDatabase)

export default categoryRoutes;
