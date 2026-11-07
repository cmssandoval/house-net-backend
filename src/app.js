import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';

import apiRouter from './routes/apiRouter.js';

import errorHandler from './middlewares/errorHandler.js';
import SPAHandler from './middlewares/SPAHandler.js';
import customHelmet from './middlewares/customHelmet.js';
import customCors from './middlewares/customCors.js';

const createApp = ({ distPath }) => {
    const app = express();

    app.use(customHelmet);
    app.use(customCors);
    app.use(express.json());
    app.use(cookieParser());
    
    app.use('/api', apiRouter);
    
    app.use(express.static(distPath));
    app.get('/*splat', SPAHandler(distPath));
    
    app.use(errorHandler);

    return app;
};

export default createApp;