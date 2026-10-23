import express from 'express';

const userRouter = express.Router();

// userRouter.get('/me', userController.readOwnUser);
// userRouter.put('/me', userController.updateOwnUser);

// Validate admin role to use this routes
// userRouter.get('/', userController.readUsers);
// userRouter.get('/:id', userController.readSingleUser);
// userRouter.get('/:id', userController.deleteSingleUser);

export default userRouter;