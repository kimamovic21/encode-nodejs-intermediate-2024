import express from 'express';

import authMiddleware from '../middlewares/authMiddleware.js'
import { 
    getAllBooks, 
    createBook, 
    getBookById, 
    updateBook, 
    deleteBook, 
    buyBook 
} from '../controllers/bookController.js';

const router = express.Router();

router.get('/', getAllBooks);
router.post('/', authMiddleware, createBook);
router.get('/:id', authMiddleware, getBookById);
router.put('/:id', authMiddleware, updateBook);
router.delete('/:id', authMiddleware, deleteBook);
router.post('/purchase/:id', authMiddleware, buyBook);

export default router;
