import { Router } from 'express';
import { login, logout, register, verifyToken } from '../controllers/auth.controller';

export const authRouter = Router();

authRouter.post('/login', login);
authRouter.post('/register', register);
authRouter.post('/logout', logout);
authRouter.get('/me', verifyToken);
