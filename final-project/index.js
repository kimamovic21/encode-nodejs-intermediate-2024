import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import 'dotenv/config';

import bookRoutes from './routes/bookRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(bodyParser.json());

const connectToDb = async () => await mongoose.connect(MONGO_URI);

await connectToDb()
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.log(error));

app.get('/api', (req, res) => res.send('Welcome to my Book Store App!'));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);

app.listen(PORT, () => console.log(`Example app listening on port: ${PORT}`));
