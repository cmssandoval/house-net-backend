import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import apiRouter from './routes/apiRouter.js';

import errorHandler from './middlewares/errorHandler.js';
import SPAHandler from './middlewares/spaHandler.js';
import customCors from './middlewares/customCors.js';

const app = express();

const PORT = process.env.PORT;
const HOST = process.env.HOST;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, '..', 'dist');

const env =
    process.env.NODE_ENV
        ? process.env.NODE_ENV
        : 'development';
if ( env === 'development') app.use(customCors);
app.use(express.json());

app.use('/api', apiRouter);

app.use(express.static(distPath));
app.get('/*splat', SPAHandler(distPath));

app.use(errorHandler);

app.listen(PORT, HOST, () => {
    console.log(`Server is ON at http://localhost:${PORT}`);
});
