import { Router } from 'express';
import { login, logout, register, verifyToken } from '../controllers/auth.controller';
import { checkAccessToken } from '../middlewares/checkAccessToken';
import { authPayloadSchema } from '@repo/shared-types';
import { validateRequestBody } from '../middlewares/validateRequest';

export const authRouter = Router();

authRouter.post('/login', validateRequestBody(authPayloadSchema), login);
authRouter.post('/register', validateRequestBody(authPayloadSchema), register);
authRouter.post('/logout', checkAccessToken, logout);
authRouter.get('/me', verifyToken);
