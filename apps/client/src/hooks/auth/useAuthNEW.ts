import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AuthPayload } from '../../components/AuthForm/types/auth-payload-schema';
import AuthService from '../../requests/auth';

type AuthResponse = {
  message: string;
  error?: string;
};

export const useAuthNEW = (options?: UseMutationOptions<AuthResponse, unknown, AuthPayload>) => {
  const login = useMutation({
    mutationKey: ['login'],
    mutationFn: AuthService.login,
    ...options,
  });

  const register = useMutation({
    mutationKey: ['logout'],
    mutationFn: AuthService.logout,
    ...options,
  });

  const logout = useMutation({
    mutationKey: ['register'],
    mutationFn: AuthService.register,
    ...options,
  });

  return { login, register, logout };
};
