import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import carRoutes from './routes/carRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const connectToDb = async () => await mongoose.connect('mongodb://localhost:27017/carShop');

await connectToDb()
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.log(error));

app.get('/', (req, res) => res.send('Working!'));

app.use('/api/cars', carRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => console.log(`Example app listening on PORT: ${PORT}`));
