import { SetOptions } from 'redis';
import { SECONDS_IN_A_DAY } from './time';

export const hashes = {
  pokemonsList: 'pokemons',
};

export const ttlOptions = {
  EXPIRED_OR_KEY_DOES_NOT_EXIST: -2,
};

export const redisCacheConfig: SetOptions = {
  EX: SECONDS_IN_A_DAY,
};
