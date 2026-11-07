import { cookieOptions, sessionCookieOptions } from '../config/cookie.js';
import authService from '../services/authService.js';

/** @type {import('express').RequestHandler} */
const handleRegister = async ( req, res ) => {
  const { email, fullName, password } = req.body;
  await authService.register({ email, fullName, password });
  res.status(201).json({ message: 'User registered successfully!' });
};

/** @type {import('express').RequestHandler} */
const handleLogin = async ( req, res ) => {
  const { email, password } = req.body;
  const { token } = await authService.login({ email, password });
  res
    .cookie('token', token, sessionCookieOptions)
    .status(200)
    .json({ message: 'User logged in successfully!' });
};

/** @type {import('express').RequestHandler} */
const handleAuth = async ( req, res ) => {
  return res.status(200).json({
    user: req.user
      ? { userId: req.user.id, role: req.user.role }
      : null,
  });
};

/** @type {import('express').RequestHandler} */
const handleLogout = async ( req, res ) => {
  res
    .clearCookie('token', cookieOptions)
    .status(200)
    .json({ message: 'User logged out successfully!' });
};

const authController = {
  handleRegister,
  handleLogin,
  handleAuth,
  handleLogout,
};

export default authController;