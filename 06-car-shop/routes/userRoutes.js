import express from 'express';
import { getAllUsers, updateUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getAllUsers);
router.put('/:id', updateUser);

export default router;