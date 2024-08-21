import dotenv from 'dotenv';
dotenv.config();  // Load environment variables from .env file
import express from 'express';
import connectDB from './db.js';  // Adjust the path if needed
import { UserModel } from './models/Users.js'; // Use named import
import userRouter from './routes/users.js'; // Import the userRouter
import cors from 'cors';

const app = express();

app.use(express.json())
app.use(cors({
    origin: 'https://your-client-vercel-url.vercel.app', // Replace with your client URL
  }));

connectDB();


app.get('/', async (req, res) => {
    try {
        const users = await UserModel.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
});
//mongoose.connect("mongodb+srv://vital0035:lqUKaHtEEtZbCGDW@crypto.svrks.mongodb.net/crypto?retryWrites=true&w=majority&appName=crypto") 

// Use userRouter for routes starting with /users
app.use('/', userRouter);

app.listen(3001, () => {
    console.log("server started!!")
});