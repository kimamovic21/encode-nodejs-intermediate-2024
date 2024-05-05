import mongoose from 'mongoose';
import 'dotenv/config';
import colors from 'colors';

const MONGO_URI = process.env.MONGO_URI;

const connectToDb = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log(colors.green('Successfully Connected to MongoDB!'));
    } catch (error) {
        console.error(`Error connecting to MongoDB:, ${error}`);
    };
};

export default connectToDb;