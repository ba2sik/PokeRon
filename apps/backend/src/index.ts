import express, { Express, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { apiRouter } from './routes/api.routes.js';
import { supabaseBACKEND } from './supabase/supabseClient';
import { env } from './env/env';

const app: Express = express();
const port = env.PORT;

export const prismaClient = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  }),
);
app.use('/api', apiRouter);

app.get('/', async (req: Request, res: Response) => {
  // const favoriteCards = await prisma.favoriteCard.findMany();
  // res.send(favoriteCards);
  const user = await supabaseBACKEND.auth.getSession();
  res.send(user);
});

app.use((err: Error, req: Request, res: Response) => {
  console.error('Unhandled error:', err.message); // Log the error
  res.status(500).json({ message: 'An unexpected error occurred', error: err.message });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
