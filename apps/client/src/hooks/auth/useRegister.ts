import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import AuthService from '../../requests/auth';
import { AuthPayload } from '../../components/AuthForm/types/auth-payload-schema';
import { AuthResponse } from '../../types/auth';
import { useRefreshSession } from './useRefreshSession';

export const useRegister = (options?: UseMutationOptions<AuthResponse, unknown, AuthPayload>) => {
  const refreshSession = useRefreshSession();

  return useMutation({
    mutationKey: ['logout'],
    mutationFn: AuthService.register,
    onSuccess: refreshSession,
    ...options,
  });
};
