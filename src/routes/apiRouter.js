import express from 'express';
import inventoryRouter from './inventoryRouter.js';
// import cameraRouter from './cameraRouter.js';

const apiRouter = express.Router();

apiRouter.get('/', (req, res) => {
    return res.json({
        info: {
            code: 200,
            status: 'Online',
            message: 'Welcome to House Net API',
        }
    });
});

apiRouter.use('/inventory', inventoryRouter);
// apiRouter.use('/tareas', inventarioRouter);
// apiRouter.use('/calendario', inventarioRouter);
// apiRouter.use('/camara', camaraRouter); //! DO NOT USE CAMERA ROUTES, NOT IMPLEMENTED

apiRouter.use((req, res, next) => {
    const err = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
    err.status = 404;
    next(err);
});

export default apiRouter;
