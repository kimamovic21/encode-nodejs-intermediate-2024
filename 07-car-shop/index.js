import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import 'dotenv/config';

import carRoutes from './routes/carRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const connectToDb = async () => await mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`);

await connectToDb()
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.log(error));

app.get('/', (req, res) => res.send('Working!'));

app.use('/api/cars', carRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => console.log(`Example app listening on PORT: ${PORT}`));
