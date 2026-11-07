import UserModel from '../models/UserModel.js';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { SESSION_SECONDS } from '../config/cookie.js';

const DUMMY_HASH = await argon2.hash('dummy-password');

const signToken = ( user ) => {
  const { id, role } = user;
  return jwt.sign({ role }, process.env.JWT_SECRET, {
    subject: String( id ),
    expiresIn: SESSION_SECONDS,
    algorithm: 'HS256'
  });
};

const register = async ({ email, fullName, password }) => {
  try {

    const passwordHash = await argon2.hash( password )
    const user = await UserModel.create({ email, fullName, passwordHash });
    return user;

  } catch (err) {
    const error = new Error('Conflict: Email already exists');
    error.status = 409;
    throw error;
  }
};

const login = async ({ email, password }) => {
  try {
    
    const user = await UserModel.findByEmailWithHash( email );
    const isPasswordValid = await argon2.verify( user?.passwordHash ?? DUMMY_HASH, password );
    if ( !user || !isPasswordValid ) {
      const error = new Error('Invalid credentials');
      error.status = '401';
      throw error;
    }

    if ( !user.isActive ) {
      const error = new Error('User account is disabled');
      error.status = '403';
      throw error;
    }

    const { passwordHash: _, ...cleanUser } = user;
    return { token: signToken(cleanUser) };

  } catch ( err ) {
    console.log(err);
    const error = new Error('Authentication process error');
    error.status = 401;
    throw error;
  }
};

const auth = async ( token ) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
}

const authService = {
  register,
  login,
  auth,
};

export default authService;