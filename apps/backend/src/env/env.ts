import { z } from 'zod';
import { printZodError } from '../utils/zod';

const EnvSchema = z.object({
  DATABASE_URL: z
    .string({
      description: 'Postgres Connection string',
      required_error: '😱 You forgot to add a database URL',
    })
    .url(),
  NODE_ENV: z
    .enum(['development', 'test', 'production'], {
      description: 'This gets updated depending on your environment',
    })
    .default('development'),
  PORT: z.coerce
    .number({
      description:
        '.env files convert numbers to strings, therefore we have to enforce them to be numbers',
    })
    .positive()
    .max(65536, `Port should be between 0 and 65536`)
    .default(3000),
  SUPABASE_URL: z
    .string({
      description: 'Supabase URL',
      required_error: '😱 You forgot to add a Supabase URL',
    })
    .url(),
  SUPABASE_ANON_KEY: z
    .string({
      description: 'Supabase Anon key',
      required_error: '😱 You forgot to add a Supabase Anon key',
    })
    .min(3),
  CLIENT_URL: z
    .string({
      description: 'Client URL',
      required_error: '😱 You forgot to add a client URL',
    })
    .url(),
  REDIS_HOST: z
    .string({
      description: 'Redis IP address',
      required_error: '😱 You forgot to add a Redis IP address',
    })
    .default('127.0.0.1'),
  REDIS_PORT: z.coerce
    .number({ description: 'Redis port' })
    .positive()
    .max(65536, `Redis Port should be between 0 and 65536`)
    .default(6379),
});

const result = EnvSchema.safeParse(process.env);

if (!result.success) {
  printZodError(result.error);
  process.exit(1);
}

export const env = result.data;
