import { z } from 'zod';

export const pokemonIdSchema = z.coerce.number().int();

const pokemonSchema = z
  .object({
    name: z.string().min(1),
    id: pokemonIdSchema,
    isFavorite: z.boolean(),
  })
  .strict();

export type Pokemon = z.infer<typeof pokemonSchema>;
