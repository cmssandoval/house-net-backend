import cors from 'cors';

const customCors = cors({
  origin: (origin, callback) => {
    if (process.env.NODE_ENV !== 'production' || !origin) {
      return callback(null, true);
    }
    return callback(new Error('Bloqueado por CORS en Producción'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
});

export default customCors;