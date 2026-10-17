import express from 'express';
import inventoryRouter from './inventory.route.js';
// import camaraRouter from './camara.route.js';

const apiRouter = express.Router();

apiRouter.get('/', (req, res) => {
    return res.json({
        info: {
            code: 200,
            status: 'Online',
            message: 'Bienvenido a la API de House Net',
        }
    });
});

apiRouter.use('/inventario', inventoryRouter);
// apiRouter.use('/tareas', inventarioRouter);
// apiRouter.use('/calendario', inventarioRouter);

// apiRouter.use('/camara', camaraRouter); //! DO NOT USE CAMERA ROUTES, NOT IMPLEMENTED

export default apiRouter;