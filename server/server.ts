import express from 'express';
import connectDB from './config/mongodb';
import productRoute from './routes/productRoute';
import protectedRoute from './routes/protectedRoute';
import userRoute from './routes/userRoute';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(
    cors({
        origin: ['http://localhost:5174', 'http://localhost:5173'],
        credentials: true,
    })
);

// Connect to Database
connectDB();

// Routes
app.use('/api/protected', protectedRoute);
app.use('/api/product/', productRoute);
app.use('/api/user/', userRoute);

// Start Server - only when not in Vercel environment
if (process.env.VERCEL_ENV !== 'production') {
    const port = process.env.PORT || 3500;
    app.listen(port, () => console.log('Server is running on ', port));
}

// Export for Vercel
export default app;
