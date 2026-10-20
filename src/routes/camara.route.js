// import express from 'express';
// import cameraController from '../controllers/camera.controller.js';

const cameraRouter = express.Router();

cameraRouter.get('/', ( req, res ) => {res.json({code: 200, status: 'Online'})})
cameraRouter.get('/stream', cameraController.streamHttp);

// export default cameraRouter;