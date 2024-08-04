import { PokemonSummary } from '@repo/poke-client';

export type BasicPokemon = Pick<PokemonSummary, 'name'> & {
  id: number;
};
