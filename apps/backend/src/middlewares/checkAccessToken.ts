import { NextFunction, Request, Response } from 'express';
import { isNullOrUndefined } from '../utils/types';

export const checkAccessToken = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies.access_token;

  if (isNullOrUndefined(accessToken)) {
    return res.status(401).json({ message: 'No access token provided' });
  }

  next();
};
