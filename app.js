import express from 'express';
import mongoose from 'mongoose';
const PORT = 5000;

//DATABASE
import "./databse.js"

//MODELS
import Post from './models/post-model.js';
import Comment from './models/comment-model.js';

// ROUTES 

import appRouter from './routes/app_router.js';

const app = express();
app.use(express.json());
app.use(appRouter);



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
