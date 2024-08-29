import dotenv from 'dotenv';
dotenv.config();  // Load environment variables from .env file

import express from 'express';
import connectDB from './db.js';  // Import the database connection
import userRouter from './routes/users.js'; // Import the userRouter
import contactUsRouter from './routes/contactUs.js'; // Import the contactUsRouter
import cors from 'cors';

const app = express();

app.use(express.json())
app.use(cors())

connectDB();


// Optional: You can use a default route if needed
// app.get('/', (req, res) => {
//     res.send('Welcome to the API');
// });


// Use userRouter for routes starting with /users
app.use('/', userRouter);

// Optional default route
app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Contact Us route
app.use('/contactUs', contactUsRouter);

app.listen(3001, () => {
    console.log("server started!!")
});