import { z } from 'zod';
import { createEnv } from '@t3-oss/env-core';

export const env = createEnv({
  server: {
    PORT: z.coerce.number().default(3000),
    SUPABASE_URL: z.string().url(),
    SUPABASE_ANON_KEY: z.string(),
    CLIENT_URL: z.string().url(),
    REDIS_HOST: z.string().ip().default('127.0.0.1'),
    REDIS_PORT: z.coerce.number().default(6379),
    NODE_ENV: z.enum(['development', 'test', 'production']),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
  },
});
