import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import router from './src/routes/index.js';

import connectCloudinary from './src/config/cloudinary.js';
import { connDB } from './src/config/connDB.js';
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 4000;

connDB();
connectCloudinary();
app.use(cookieParser());

app.use(cors({
    origin: process.env.CLIENT_URL || 'https://spotify-clone-69yg.vercel.app',
    credentials: true
}));

app.use(express.json());

app.use('/', router);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
