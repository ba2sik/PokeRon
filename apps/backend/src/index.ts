import express, { Express, NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { apiRouter } from './routes/api.routes.js';
import { env } from './env/env';
import { createClient } from 'redis';
import { StatusCodes } from 'http-status-codes';

const app: Express = express();
const port = env.PORT;

export const prismaClient = new PrismaClient();
export const redisClient = createClient();

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

app.get('/', async (_req: Request, res: Response) => {
  res.send('Hello World');
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled error:', err.message);
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: 'An unexpected error occurred', error: err.message });
});

const start = async () => {
  try {
    await redisClient.on('error', (err) => console.log('Redis Client Error', err)).connect();

    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
