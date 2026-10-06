import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import apiRouter from './routes/api.route.js'
const app = express();

const PORT = process.env.PORT;
const HOST = process.env.HOST;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, '..', 'dist');

app.use('/api', apiRouter);

app.use(express.static(distPath));

app.get('/*splat', ( req, res ) => {
    const indexHTML = path.join(distPath, 'index.html');

    res.sendFile(indexHTML, (err) => {
        if (err) {
            console.error(`Error al enviar index.html: ${err.message}`);

            if (!res.headersSent) {
                res.status(500).json({ error: 'Internal Server Error'})
            }
        }
    });
});

app.listen(PORT, HOST, () => {
    console.log(`Server is ON at http://localhost:${PORT}`);
});