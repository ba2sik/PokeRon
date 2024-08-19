import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AuthPayload } from '../../components/AuthForm/types/auth-payload-schema';
import { isNotNullOrUndefined } from '../../utils';
import { AuthForm } from '../../components/AuthForm/AuthForm';
import { ROUTES } from '../../constants/routes';
import { useAuth } from '../../hooks/auth/useAuth';
import toast from 'react-hot-toast';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin: SubmitHandler<AuthPayload> = async ({ email, password }) => {
    const { message, error } = await login({ email, password });

    if (isNotNullOrUndefined(error)) {
      toast.error(error);
      return null;
    }

    toast.success(message);
    return navigate(ROUTES.HOME);
  };

  return (
    <div className="max-w-xs flex flex-col justify-center items-center gap-12 w-full">
      <h1 className="text-5xl">Sign In</h1>
      <AuthForm
        onSubmit={handleLogin}
        buttonText="Sign In"
      />
    </div>
  );
};
