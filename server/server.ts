import express from 'express';
import connectDB from './config/mongodb';
const app = express();

// Middleware
app.use(express.json());

// Connect to Database
connectDB();

// Start Server
const port = process.env.PORT || 3500;
app.listen(port, () => console.log('server is running on ', port));
