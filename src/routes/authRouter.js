import express from 'express';
import authController from '../controllers/authController.js';
import validateSchema from '../middlewares/validateSchema.js';
import { registerSchema, loginSchema, logoutSchema } from '../schemas/userSchemas.js';

const authRouter = express.Router();

authRouter.post('/register', validateSchema(registerSchema), authController.handleRegister);
authRouter.post('/login', validateSchema(loginSchema), authController.handleLogin);
authRouter.post('/logout', authController.handleLogout);

export default authRouter;