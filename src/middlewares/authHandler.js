import jwt from 'jsonwebtoken';

/** @type {import('express').RequestHandler} */
const authHandler = (req, res, next) => {
  const token = req.cookies?.['token'];
  if (!token) {
    const error = new Error('Authentication required');
    error.status = 401;
    return next(error);
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.sub, role: payload.role };
    next();
  } catch {
    const error = new Error('Invalid or expired token');
    error.status = 401;
    return next(error);
  }
};

export default authHandler;