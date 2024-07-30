import { QueryOptions, useQuery } from '@tanstack/react-query';
import { getConnectedUser } from '../../requests/getConnectedUser';
import { UserType } from '../../context/AuthContext';

export const useConnectedUser = (options?: QueryOptions<UserType>) => {
  return useQuery({
    queryKey: ['connectedUser'],
    queryFn: getConnectedUser,
    ...options,
  });
};
