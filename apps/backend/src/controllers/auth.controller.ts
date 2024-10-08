import { Request, Response } from 'express';
import { supabase } from '../supabase/supabseClient';
import { isNotNullOrUndefined, isNullOrUndefined } from '../utils/types';
import { getUserByToken, isUserExistsError } from '../services/auth.service';
import { AuthPayload, UserSession } from '@repo/shared-types';
import { defaultCookieOptions, expiringCookieOptions } from '../constants/cookies';
import { StatusCodes } from 'http-status-codes';
import { TypedRequestBody } from '../types/typedRequestBody';

export const login = async (req: TypedRequestBody<AuthPayload>, res: Response) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Invalid credentials', error: error.message });
  }

  const { access_token } = data.session;

  res.cookie('access_token', access_token, expiringCookieOptions);

  return res.status(StatusCodes.OK).json({ message: 'Signed in successfully' });
};

export const register = async (req: TypedRequestBody<AuthPayload>, res: Response) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (isNotNullOrUndefined(error)) {
    if (isUserExistsError(error)) {
      return res.status(StatusCodes.CONFLICT).json({ message: 'User already exists' });
    } else {
      console.error(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Error signing up', error: error.message });
    }
  }

  if (isNullOrUndefined(data.session)) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error signing up' });
  }

  const { access_token } = data.session;

  res.cookie('access_token', access_token, expiringCookieOptions);

  return res.status(StatusCodes.CREATED).json({ message: 'User created successfully' });
};

export const logout = async (req: Request, res: Response) => {
  const { error } = await supabase.auth.signOut(req.cookies.access_token);

  if (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Failed to log out', error: error.message });
  }

  res.clearCookie('access_token', defaultCookieOptions);

  return res.status(StatusCodes.OK).json({ message: 'Logged out successfully' });
};

export const verifyToken = async (req: Request, res: Response<UserSession>) => {
  const accessToken = req.cookies.access_token;
  const user = await getUserByToken(accessToken);

  if (isNullOrUndefined(user)) {
    return res.status(StatusCodes.OK).json({ loggedIn: false });
  }

  return res.status(StatusCodes.OK).json({ loggedIn: true, email: user.email });
};
