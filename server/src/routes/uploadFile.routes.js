import express from 'express';
import multer from 'multer';
import { verifyToken } from '../middleware/authJwt.js';
import { storage } from '../middleware/uploadFile.js';
import { uploadFile } from '../controller/uploadFile.controller.js';

const upload = multer({ storage: storage });
const uploadFileRoutes = express.Router();

uploadFileRoutes.post(
    '/api/v1/user/auth/upload-file',
    [upload.single('file'), verifyToken],
    uploadFile,
);

export default uploadFileRoutes;
