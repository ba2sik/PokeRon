import { z } from 'zod';

const pokemonSchema = z
  .object({
    name: z.string().min(1),
    id: z.coerce.number().int(),
    isFavorite: z.boolean(),
  })
  .strict();

export const pokemonIdSchema = pokemonSchema.pick({ id: true });

export type Pokemon = z.infer<typeof pokemonSchema>;
