import { z } from 'zod';
import { createEnv } from '@t3-oss/env-core';

export const env = createEnv({
  server: {
    PORT: z.coerce.number().default(3000),
    SUPABASE_URL: z.string(),
    SUPABASE_ANON_KEY: z.string(),
    CLIENT_URL: z.string(),
  },
  runtimeEnv: process.env,
});
