import express, { Express, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import helmet from 'helmet';
import { apiRouter } from './routes/api.routes.js';
import { supabaseBACKEND } from './supabase/supabseClient';
import { env } from './env/env';

const app: Express = express();
const port = env.PORT;

export const prisma = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

app.use('/api', apiRouter);

app.get('/', async (req: Request, res: Response) => {
  // const favoriteCards = await prisma.favoriteCard.findMany();
  // res.send(favoriteCards);
  const user = await supabaseBACKEND.auth.getSession();
  res.send(user);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
