import express from 'express';
import mongoose from 'mongoose';

import carRoutes from './routes/carRoutes.js';

const app = express();
const PORT = 3000;

const connectToDb = async () => {
    await mongoose.connect('mongodb://localhost:27017/carShop');
};

await connectToDb()
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.log(error));

app.get('/', (req, res) => {
  res.send('Working!');
});

app.use('/api/cars', carRoutes);

app.listen(PORT, () => {
  console.log(`Example app listening on PORT: ${PORT}`);
});
