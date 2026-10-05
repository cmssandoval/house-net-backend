import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const app = express();

const PORT = process.env.PORT;
const HOST = process.env.HOST;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', ( req, res ) => {
    const indexHTML = path.join(__dirname, '..', 'dist', 'index.html');

    return res.status(200).sendFile(indexHTML, (err) => {
        console.error(`Error al enviar index.html: ${err.message}`);
        
        if ( !res.headersSent ) {
            return res.status(404).json('Error 404: Not Found')
        }
    });
});

app.listen(PORT, HOST, () => {
    console.log(`Server is ON at http://${HOST}/${PORT}`);
});