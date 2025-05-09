import express from 'express';
import connectDB from './config/mongodb';
import productRoute from './routes/productRoute';
import cors from 'cors';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to Database
connectDB();

//routers
app.use('/api/product/', productRoute);

// Start Server
const port = process.env.PORT || 3500;
app.listen(port, () => console.log('server is running on ', port));
