import express from 'express';
import * as albumController from '../controllers/albumController.js';
import uploud from '../middlewares/multer.js';
import verifyJWT from '../middlewares/verifyJWT.js'
import checkRole from '../middlewares/checkRole.js';

const albumRouter = express.Router();

albumRouter.get('/list', albumController.ListAlbums);
albumRouter.get('/list/:id', albumController.album);

albumRouter.use(verifyJWT);

albumRouter.post('/add', checkRole('admin'), uploud.single('image'), albumController.addAlbum);
albumRouter.delete('/remove/:id', checkRole('admin'), albumController.removeAlbum);

export default albumRouter;