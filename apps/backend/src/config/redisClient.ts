import { createClient } from 'redis';
import { env } from '../env/env';

export const redisClient = createClient({
  socket: {
    port: env.REDIS_PORT,
    host: env.REDIS_HOST,
    reconnectStrategy: false,
  },
});

redisClient.on('error', (err) => {
  console.error('Redis Error: ', err);
});

redisClient.on('ready', () => {
  console.log('[Redis] Connected Successfully');
});
