import { ZodError } from 'zod';

/**
 * @type {import('express').ErrorRequestHandler}
 * @param {Error} err Error object.
*/
const errorHandler = ( err, req, res, next ) => {
    console.log(err.stack);
    if (req.headersSent) return next(err);
    
    if (err instanceof ZodError) {
      return res.status(400).json({
        status: 'error',
        error: 'Bad request, make sure you are sending the requested data.',
      });
    }

    res.status(err.statusCode || 500).json({
        status: err.statusCode,
        error: err.message || 'Internal server error'
    });
};

export default errorHandler;