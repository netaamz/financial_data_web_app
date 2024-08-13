import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from 'cors';
import mongoose from 'mongoose';
// import { userRouter } from './routes/users.js';
// import { taskRouter } from './routes/tasks.js';

const app=express();
// const link= process.env.DB_CONNECT;

app.use(express.json());
app.use(cors()); //

// app.use("/auth", userRouter); 
// app.use("/tasks", taskRouter);
mongoose.connect("mongodb+srv://vital0035:lqUKaHtEEtZbCGDW@crypto.svrks.mongodb.net/crypto?retryWrites=true&w=majority&appName=crypto") 
// mongoose.connect(
//     link,
//     {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     }
//     ); // connect to DB

app.listen(3001, () => console.log("server started!!"));