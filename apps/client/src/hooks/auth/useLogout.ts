import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import AuthService from '../../requests/auth';
import { useRefreshSession } from './useRefreshSession';

export const useLogout = (options?: UseMutationOptions) => {
  const refreshSession = useRefreshSession();

  return useMutation({
    mutationKey: ['register'],
    mutationFn: AuthService.logout,
    onSuccess: refreshSession,
    ...options,
  });
};
