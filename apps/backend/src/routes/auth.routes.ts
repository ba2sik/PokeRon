import { Router } from 'express';
import { login, logout, register, verifyToken } from '../controllers/auth.controller';
import { checkAccessToken } from '../middlewares/checkAccessToken';

export const authRouter = Router();

authRouter.post('/login', login);
authRouter.post('/register', register);
authRouter.post('/logout', checkAccessToken, logout);
authRouter.get('/me', checkAccessToken, verifyToken);
