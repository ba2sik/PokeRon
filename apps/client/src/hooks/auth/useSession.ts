import { QueryOptions, useQuery, UseQueryResult } from '@tanstack/react-query';
import AuthService, { UserSession } from '../../requests/auth';

export const useSession = (options?: QueryOptions): UseQueryResult<UserSession> => {
  return useQuery({
    queryKey: ['session'],
    queryFn: AuthService.getSession,
    ...options,
  });
};
