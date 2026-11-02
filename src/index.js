import 'dotenv/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import createApp from './app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, '..', 'dist');

const app = createApp({ distPath });

const PORT = process.env.PORT ?? 5000;
const HOST = process.env.HOST ?? '0.0.0.0';

app.listen(PORT, HOST, () => {
    console.log(`Server is ON at http://localhost:${PORT}`);
});
