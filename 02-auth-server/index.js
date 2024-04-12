import express from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config';

import authRoutes from './routes/auth.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Working!'));

app.use('/api/auth', authRoutes);

app.listen(PORT, () => console.log(`Example app listening on port: ${PORT}`));
