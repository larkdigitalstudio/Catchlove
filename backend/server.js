import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';
import authRoutes from './routes/Auth.js';
import addRoutes from './routes/Add.js';
import updateRoutes from './routes/Update.js';

// Load environment variables from .env file
dotenv.config();

// Create an express application
const app = express();

// Connect to the MongoDB database
connectDB();

// Middleware to parse JSON data
app.use(express.json());

// Middleware to handle errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

//Routes
// Import the authRoutes
app.use('/api/auth', authRoutes);
//import the addRoutes
app.use('/api/add', addRoutes);
//import the UpdateRoutes
app.use('/api/update', updateRoutes);

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});