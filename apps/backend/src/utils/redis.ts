import { ttlOptions } from '../constants/redis';

export const isTtlExpired = (ttl: number) => {
  return ttl === ttlOptions.EXPIRED_OR_KEY_DOES_NOT_EXIST;
};
