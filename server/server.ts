import express from 'express';
import connectDB from './config/mongodb';
import productRoute from './routes/productRoute';
import protectedRoute from './routes/protectedRoute';
import userRoute from './routes/userRoute';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
// Middleware
app.use(
    cors({
        origin: [
            'https://mercadoxfrontend.vercel.app',
            'https://mercadox-admin-panel.vercel.app',
        ],
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

connectDB();
// Routes
app.get('/', (req, res) => {
    res.send('Server is working');
});

app.use('/api/protected', protectedRoute);
app.use('/api/product/', productRoute);
app.use('/api/user/', userRoute);

export default app;
