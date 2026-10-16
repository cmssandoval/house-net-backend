import express from 'express';
import inventarioRouter from './inventario.route.js';
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

apiRouter.use('/inventario', inventarioRouter);
// apiRouter.use('/tareas', inventarioRouter);
// apiRouter.use('/calendario', inventarioRouter);

// apiRouter.use('/camara', camaraRouter); //* No utilizar rutas de cámara hasta implementar web socket

export default apiRouter;