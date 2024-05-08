import express from 'express';
import mongoose from 'mongoose';
import colors from 'colors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/authRoutes.js';

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

const port = 3000;

mongoose
    .connect('mongodb://localhost:27017/productApp')
    .then(() => console.log(colors.green('Connected to DB')))
    .catch(() => console.log(colors.red('Could not connect to DB')));

app.get('/', (req, res) => {
    console.log(req.cookies);
    res.send('Hello World!')}
);

app.use('/api/auth/', authRoutes);

app.listen(port, () => console.log(colors.green(`Product app listening on port ${port}`)));