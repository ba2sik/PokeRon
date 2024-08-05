import express, { Express, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const app: Express = express();
const port = process.env.PORT || 3000;

export const prisma = new PrismaClient();

app.get('/', async (req: Request, res: Response) => {
  const favoriteCards = await prisma.favoriteCard.findMany();
  res.send(favoriteCards);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
