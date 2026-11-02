import path from 'node:path';
import { fileURLToPath } from 'node:url';
import createApp from '../../src/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, '..','fixtures');

const app = createApp({ distPath });

export default app;