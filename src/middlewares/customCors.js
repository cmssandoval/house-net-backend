import cors from 'cors';
import { allowedOrigins } from '../config/allowedOrigins.js';

const customCors = cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);

    return callback(new Error('Bloqueado por CORS en Producción'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
});

export default customCors;