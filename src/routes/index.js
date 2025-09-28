import express from 'express';
import songRouter from './songRoutes.js';
import albumRouter from './albumRoute.js';
import authRouter from './authRoutes.js';


const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Spotify API'
    })
})

router.use('/auth', authRouter);
router.use('/song', songRouter);
router.use('/album', albumRouter);


export default router;
