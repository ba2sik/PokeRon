import express, { Express, NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@repo/db';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { apiRouter } from './routes/api.routes';
import { env } from './env/env';
import { StatusCodes } from 'http-status-codes';
import { redisClient } from './config/redisClient';

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
    await redisClient.connect();

    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
