import { NextFunction, Request, Response } from 'express';
import { isNullOrUndefined } from '../utils/types';
import { StatusCodes } from 'http-status-codes';

export const checkAccessToken = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies.access_token;

  if (isNullOrUndefined(accessToken)) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'No access token provided' });
  }

  next();
};
