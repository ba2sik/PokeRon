import type { CookieOptions } from 'express';
import { MS_IN_A_DAY } from './time';
import { env } from '../env/env';

export const AccessTokenCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: MS_IN_A_DAY,
};