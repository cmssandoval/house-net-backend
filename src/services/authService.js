import UserModel from '../models/UserModel.js';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

const DUMMY_HASH = await argon2.hash('dummy-password');

const signToken = ( user ) => {
  const { id, role } = user;
  jwt.sign({ sub: id, role }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

const register = async ({ email, fullName, password }) => {
  try {

    const passwordHash = await argon2.hash( password )
    const user = await UserModel.create({ email, fullName, passwordHash });
    return user;

  } catch (error) {
    console.error( 'Authentication process error:', error );
    throw error;
  }
};

const login = async ({ email, password }) => {
  try {
    
    const user = await UserModel.findByEmailWithHash( email );
    const isPasswordValid = await argon2.verify( user?.passwordHash ?? DUMMY_HASH, password );
    if ( !user || !isPasswordValid ) throw new Error('Credentials are invalid');
    if ( !user.isActive ) throw new Error('Account is disabled');

    const { passwordHash: _, ...cleanUser } = user;
    return { user: cleanUser, token: signToken(cleanUser) };

  } catch ( error ) {
    console.error( 'Authentication process error:', error );
    throw error;
  }
};

const authService = {
  register,
  login,
};

export default authService;