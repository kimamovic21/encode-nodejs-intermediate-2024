import express from 'express';
import multer from 'multer';

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

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); 
    }
});

const upload = multer({ storage: storage });

router.get('/', getAllBooks);
router.post('/', authMiddleware, upload.single('image'), createBook);
router.get('/:id', authMiddleware, getBookById);
router.put('/:id', authMiddleware, upload.single('image'), updateBook);
router.delete('/:id', authMiddleware, deleteBook);
router.post('/purchase/:id', authMiddleware, buyBook);

export default router;
