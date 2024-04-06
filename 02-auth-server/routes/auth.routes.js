import express from 'express';
import { register, login, privateEndpoint } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/private', privateEndpoint);

export default router;