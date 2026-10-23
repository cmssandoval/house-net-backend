import authService from '../services/AuthService.js';

/** @type {import('express').RequestHandler} */
const handleRegister = async ( req, res ) => {
  const { email, fullName, password } = req.body;
  await authService.register({ email, fullName, password });
  res.status(201).json({ message: 'User registered successfully!' });
};

/** @type {import('express').RequestHandler} */
const handleLogin = async ( req, res ) => {
  const { email, password } = req.body;
  const { user, token } = await authService.login({ email, password });
  res
    .cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 360000,
    })
    .status(200)
    .json({ message: 'User logged in successfully!', user });
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
  handleLogout,
};

export default authController;