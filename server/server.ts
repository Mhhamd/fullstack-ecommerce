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
app.use(
    cors({
        origin: 'https://mercadoxfrontend.vercel.app',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'Accept',
            'X-Requested-With',
        ],
    })
);

const startServer = async () => {
    try {
        await connectDB();
        console.log('Database connected successfully');

        // Routes
        app.get('/', (req, res) => {
            res.send('Server is working');
        });

        app.use('/api/protected', protectedRoute);
        app.use('/api/product/', productRoute);
        app.use('/api/user/', userRoute);

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();

export default app;
