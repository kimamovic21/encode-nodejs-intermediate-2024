import express from 'express';

import { createProduct } from '../controllers/productController.js';
import verifyToken from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', verifyToken, createProduct);

export default router;