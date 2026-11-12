const isProduction = process.env.NODE_ENV === 'production';

export const SESSION_SECONDS = 60 * 60;

export const cookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: isProduction,
};

export const sessionCookieOptions = {
  ...cookieOptions,
  maxAge: SESSION_SECONDS * 1000,
};