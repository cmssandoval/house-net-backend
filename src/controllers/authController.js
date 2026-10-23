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
    .cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 360000,
    })
    .status(200)
    .json({ message: 'User logged in successfully!' });
};

/** @type {import('express').RequestHandler} */
const handleAuth = async ( req, res ) => {
  const token = req.cookies.token;
  if ( !token ) {
    const error = new Error('Not authenticated');
    error.status = 401;
    throw error;
  }
  try {
    const decoded = await authService.auth(token);
    return res.status(200).json({
      userId: decoded.sub,
      role: decoded.role,
    });
  } catch (err) {
    const error = new Error('Invalid or expired token');
    error.status = 401;
    throw error;
  }
};

/** @type {import('express').RequestHandler} */
const handleLogout = async ( req, res ) => {
  res
    .clearCookie('token', {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    })
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