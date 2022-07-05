import express from 'express';
import { addComment, getAllCommentOfProduct } from '../controller/comment.controller.js';
import { verifyToken } from '../middleware/authJwt.js';
import multer from 'multer';
import { storage } from '../middleware/uploadFile.js';

const commentRoutes = express.Router();
const upload = multer({ storage: storage });

commentRoutes.post('/api/v1/customer/auth/comments', [upload.array('files'),verifyToken], addComment);
commentRoutes.get('/api/v1/comments', getAllCommentOfProduct);

export default commentRoutes;
