import express from 'express';
import mongoose from 'mongoose';
const PORT = 5000;

//DATABASE
import "./databse.js"

//MODELS
import Post from './models/post-model.js';
import Comment from './models/comment-model.js';
import User from "./user credential/user_model.js"


// ROUTES 

import appRouter from './routes/app_router.js';
import userRouter from "./user credential/user_router.js"

const app = express();
app.use(express.json());
app.use(appRouter);
app.use(userRouter);




app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
