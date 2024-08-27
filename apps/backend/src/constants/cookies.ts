import { CookieOptions } from 'express';
import { MS_IN_A_DAY } from './time';

export const AccessTokenCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: MS_IN_A_DAY,
};
