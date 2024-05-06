import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import 'dotenv/config';

import bookRoutes from './routes/bookRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import connectToDb from './config/connectToDb.js';

const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(helmet());
app.use(cors());

connectToDb();

app.get('/api', (req, res) => res.send('Welcome to my Book Store App!'));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);

app.listen(PORT, () => console.log(`Example app listening on port: ${PORT}`));
