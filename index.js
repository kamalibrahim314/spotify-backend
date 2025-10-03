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

const corsOptions = {
    origin(origin, cb) {
        if (!origin) return cb(null, true); // Postman/health etc.
        const ok = allowList.includes(origin) || isVercelPreview(origin);
        cb(ok ? null : new Error('Not allowed by CORS'), ok);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Range'],
    exposedHeaders: ['Content-Length', 'Content-Range'],
    optionsSuccessStatus: 204
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());

app.use('/', router);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

