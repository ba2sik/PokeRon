import type { CookieOptions } from 'express';
import { MS_IN_A_DAY } from './time';
import { env } from '../env/env';

export const defaultCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === 'production',
  sameSite: 'none',
};

export const expiringCookieOptions: CookieOptions = {
  ...defaultCookieOptions,
  maxAge: MS_IN_A_DAY,
};
