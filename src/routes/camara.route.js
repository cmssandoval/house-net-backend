// import express from 'express';
// import camaraController from '../controllers/camara.controller.js';

const camaraRouter = express.Router();

camaraRouter.get('/', ( req, res ) => {res.json({code: 200, status: 'Online'})})
camaraRouter.get('/stream', camaraController.streamHttp);

// export default camaraRouter;