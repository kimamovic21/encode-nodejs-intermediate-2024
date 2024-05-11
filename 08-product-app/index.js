import express from 'express';
import mongoose from 'mongoose';
import colors from 'colors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

mongoose
    .connect(MONGO_URI)
    .then(() => console.log(colors.green('Connected to DB')))
    .catch(() => console.log(colors.red('Could not connect to DB')));

app.get('/', (req, res) => {
    console.log(req.cookies);
    res.send('Hello World!');
});

app.use('/api/auth/', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

app.listen(PORT, () => console.log(colors.green(`Product app listening on port: ${PORT}`)));