import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const mongoURI = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI!);
        console.log('DB Connected');
    } catch (error) {
        console.error('DB Connection error', error);
    }
};

export default connectDB;
