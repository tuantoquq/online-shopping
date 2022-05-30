import express from 'express';
import { insertCategoryToDatabase } from '../controller/category.js';
import { verifyToken } from '../middleware/authJwt.js';

const categoryRoutes = express.Router()
categoryRoutes.get('/api/v1/category/insert', verifyToken, insertCategoryToDatabase);

export default categoryRoutes;
