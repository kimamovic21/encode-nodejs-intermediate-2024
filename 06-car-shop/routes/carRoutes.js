import express from 'express';
import { getAllCars, createCar, getCarById, updateCar, deleteCar, buyCar } from '../controllers/carController.js';

const router = express.Router();

router.get('/', getAllCars);
router.post('/', createCar);
router.get('/:id', getCarById);
router.put('/:id', updateCar);
router.delete('/:id', deleteCar);
router.post('/purchase/:id', buyCar);

export default router;
