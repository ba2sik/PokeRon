import { QueryOptions, useQuery } from '@tanstack/react-query';
import AuthService from '../../requests/auth';

export const useSession = (options?: QueryOptions<unknown>) => {
  return useQuery({
    queryKey: ['session'],
    queryFn: AuthService.getSession,
    ...options,
  });
};
