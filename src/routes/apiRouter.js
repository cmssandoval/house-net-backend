import express from 'express';
import inventoryRouter from './inventoryRouter.js';
import userRouter from './userRouter.js';
import authRouter from './authRouter.js';
import { identify, requireAuth } from '../middlewares/authHandler.js';

const apiRouter = express.Router();

apiRouter.get('/', (req, res) => {
    return res.json({
        info: {
            status: 'Online',
            message: 'Welcome to House Net API',
        }
    });
});
apiRouter.use(identify);
apiRouter.use('/auth', authRouter);

apiRouter.use('/inventory', requireAuth,inventoryRouter);
apiRouter.use('/user', requireAuth, userRouter);
// apiRouter.use('/tareas', inventarioRouter);
// apiRouter.use('/calendario', inventarioRouter);

apiRouter.use((req, res, next) => {
    const err = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
    err.status = 404;
    next(err);
});

export default apiRouter;
