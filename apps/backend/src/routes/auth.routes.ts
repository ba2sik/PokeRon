import { Router } from 'express';
import { login, logout, register } from '../controllers/auth.controller';

export const authRouter = Router();

authRouter.post('/login', login);
authRouter.post('/register', register);
authRouter.post('/logout', logout);
