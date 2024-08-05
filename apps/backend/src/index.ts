import express, { Express, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import helmet from 'helmet';

const app: Express = express();
const port = process.env.PORT || 3000;

export const prisma = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

app.get('/', async (req: Request, res: Response) => {
  const favoriteCards = await prisma.favoriteCard.findMany();
  res.send(favoriteCards);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
