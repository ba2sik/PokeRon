import { QueryOptions, useQuery, UseQueryResult } from '@tanstack/react-query';
import AuthService from '../../requests/auth';
import { UserSession } from '@repo/shared-types';

export const useSession = (options?: QueryOptions): UseQueryResult<UserSession> => {
  return useQuery({
    queryKey: ['session'],
    queryFn: AuthService.getSession,
    ...options,
  });
};
