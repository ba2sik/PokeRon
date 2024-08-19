import { useMutation, UseMutationOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { AuthPayload } from '../../components/AuthForm/types/auth-payload-schema';
import AuthService from '../../requests/auth';

type AuthResponse = {
  message: string;
  error?: string;
};

export const useAuth = (options?: UseMutationOptions<AuthResponse, unknown, AuthPayload>) => {
  const queryClient = useQueryClient();

  const refreshSession = () => void queryClient.invalidateQueries({ queryKey: ['session'] });

  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: AuthService.login,
    onSuccess: refreshSession,
    ...options,
  });

  const registerMutation = useMutation({
    mutationKey: ['logout'],
    mutationFn: AuthService.register,
    onSuccess: refreshSession,
    ...options,
  });

  const logoutMutation = useMutation({
    mutationKey: ['register'],
    mutationFn: AuthService.logout,
    onSuccess: refreshSession,
  });

  const session = useQuery({
    queryKey: ['session'],
    queryFn: AuthService.getSession,
    ...options,
  });

  return {
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    session: session.data,
  };
};
