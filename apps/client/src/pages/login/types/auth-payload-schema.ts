import { z } from 'zod';

export const authPayloadSchema = z
  .object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must contain at least 6 Characters' }),
  })
  .strict();

export type AuthPayload = z.infer<typeof authPayloadSchema>;
