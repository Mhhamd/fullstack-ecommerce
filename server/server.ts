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
app.use(cors());

// Connect to Database
connectDB();

app.get('/', (req, res) => {
    res.send('Server is working');
});

// Routes
app.use('/api/protected', protectedRoute);
app.use('/api/product/', productRoute);
app.use('/api/user/', userRoute);

// Start Server
const port = process.env.PORT || 3500;
app.listen(port, () => console.log('server is running on ', port));
