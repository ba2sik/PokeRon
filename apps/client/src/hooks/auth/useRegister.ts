import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import AuthService from '../../requests/auth';
import { AuthResponse } from '../../types/auth';
import { useRefreshSession } from './useRefreshSession';
import { AuthPayload } from '@repo/shared-types';

export const useRegister = (options?: UseMutationOptions<AuthResponse, unknown, AuthPayload>) => {
  const refreshSession = useRefreshSession();

  return useMutation({
    mutationKey: ['logout'],
    mutationFn: AuthService.register,
    onSuccess: refreshSession,
    ...options,
  });
};
