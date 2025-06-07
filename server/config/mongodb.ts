import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const mongoURI = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI!, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        console.log('DB Connected');
    } catch (error) {
        console.error('DB Connection error', error);
        process.exit(1);
    }
};
export default connectDB;
