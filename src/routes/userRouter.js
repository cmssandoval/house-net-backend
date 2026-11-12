import express from 'express';
import userController from "../controllers/userController.js";

const userRouter = express.Router();

// userRouter.get('/me', userController.readOwnUser);
// userRouter.put('/me', userController.updateOwnUser);

// Validate admin role to use this routes
userRouter.get('/', userController.readUsers);
userRouter.post('/', userController.createUser);

userRouter.post('/:id', userController.createUser);
userRouter.put('/:id', userController.replaceUser);
userRouter.delete('/:id', userController.deleteUser);

export default userRouter;