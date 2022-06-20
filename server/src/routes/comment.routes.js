import express from 'express';
import { addComment, getAllCommentOfProduct } from '../controller/comment.controller.js';
import { verifyToken } from '../middleware/authJwt.js';

const commentRoutes = express.Router();

commentRoutes.post('/api/v1/customer/auth/comments', verifyToken, addComment);
commentRoutes.get('/api/v1/comments', getAllCommentOfProduct);

export default commentRoutes;
