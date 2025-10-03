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
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);

        const allowedOrigins = process.env.CLIENT_URL || [
            'http://localhost:5173',
            'https://spotify-clone-69yg.vercel.app'
        ];

        if (allowedOrigins.indexOf(origin) !== -1 || origin.includes('localhost')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));

app.use(express.json());

app.use('/', router);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

