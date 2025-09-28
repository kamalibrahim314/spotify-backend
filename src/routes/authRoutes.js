import express from 'express';
import * as authController from '../controllers/authController.js';
import validation from '../middlewares/validation.js';
import { signInSchema, signUpSchema } from '../validator/auth.validator.js';

const authRouter = express.Router();

authRouter.post("/signup", validation(signUpSchema), authController.register);
authRouter.post("/signin", validation(signInSchema), authController.login);
authRouter.post("/refresh", authController.refresh);
authRouter.post("/logout", authController.logout);

export default authRouter;
