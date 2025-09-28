import * as songController from '../controllers/songController.js';
import express from 'express';
import uploud from '../middlewares/multer.js';
import checkRole from '../middlewares/checkRole.js';
import verifyJWT from '../middlewares/verifyJWT.js';

const songRouter = express.Router();

songRouter.get('/list', songController.ListSongs);
songRouter.get('/list/:id', songController.albumSongs);


songRouter.use(verifyJWT);
songRouter.post('/add', checkRole('admin'), uploud.fields([{ name: 'image', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), songController.addSong);
songRouter.delete('/remove/:id', checkRole('admin'), songController.removeSong);

export default songRouter;