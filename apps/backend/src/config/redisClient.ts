import { createClient } from 'redis';
import { env } from '../env/env';

const isProd = env.NODE_ENV === 'production';

export const redisClient = createClient(
  isProd
    ? {
        url: env.REDIS_URL,
      }
    : {
        socket: {
          port: env.REDIS_PORT,
          host: env.REDIS_HOST,
          reconnectStrategy: false,
        },
      },
);

redisClient.on('error', (err) => {
  console.error('Redis Error: ', err);
});

redisClient.on('ready', () => {
  console.log('[Redis] Connected Successfully');
});
