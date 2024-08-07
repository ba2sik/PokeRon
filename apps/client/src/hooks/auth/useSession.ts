import { QueryOptions, useQuery } from '@tanstack/react-query';
import { getSession } from '../../requests/getSession';
import { Session } from '@supabase/supabase-js';

export const useSession = (options?: QueryOptions<Session | null>) => {
  return useQuery({
    queryKey: ['session'],
    queryFn: getSession,
    ...options,
  });
};
