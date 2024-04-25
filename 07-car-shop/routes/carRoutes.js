import express from 'express';

import authMiddleware from '../middlewares/authMiddleware.js'
import { getAllCars, createCar, getCarById, updateCar, deleteCar, buyCar } from '../controllers/carController.js';

const router = express.Router();

router.get('/', getAllCars);
router.post('/', authMiddleware, createCar);
router.get('/:id', authMiddleware, getCarById);
router.put('/:id', authMiddleware, updateCar);
router.delete('/:id', authMiddleware, deleteCar);
router.post('/purchase/:id', authMiddleware, buyCar);

export default router;
