import jwt from 'jsonwebtoken';
import { cookieOptions } from '../config/cookie.js';

const unauthorized = (message) => {
  const error = new Error(message);
  error.status = 401;
  return error;
};

/** @type {import('express').RequestHandler} */
export const identify = (req, res, next) => {
  const token = req.cookies?.token;
  req.user = null;

  if ( token ) {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });
      req.user = { id: payload.sub, role: payload.role };
    } catch {
      res.clearCookie('token', cookieOptions);
    }
  }
  next();
};

/** @type {import('express').RequestHandler} */
export const requireAuth = (req, res, next) => {
  if (!req.user) return next(unauthorized('Authentication required'));
  next();
};

//? Considering role validation inside this middleware
// /** @type {import('express').RequestHandler} */
// export const requireRole = (...roles) => (req, res, next) => {
//   if (!req.user) return next(unauthorized('Authentication required'));
//   if (!roles.includes(req.user.role)) {
//     const error = new Error('Forbidden');
//     error.status = 403;
//     return next(error);
//   }
//   next();
// };