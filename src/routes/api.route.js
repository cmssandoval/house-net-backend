import express from 'express';
import inventarioRouter from './inventario.route.js'

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

apiRouter.use('/inventario', inventarioRouter);
// apiRouter.use('/tareas', inventarioRouter);
// apiRouter.use('/calendario', inventarioRouter);

export default apiRouter;