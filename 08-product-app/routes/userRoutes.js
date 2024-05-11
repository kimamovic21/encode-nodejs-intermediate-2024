import express from 'express';

import { createUser } from '../controllers/userController.js';
import verifyToken from '../middlewares/authMiddleware.js';
import adminRole from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.post('/', verifyToken, adminRole, createUser);

export default router;