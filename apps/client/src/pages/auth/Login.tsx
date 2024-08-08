import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AuthPayload } from '../../components/AuthForm/types/auth-payload-schema';
import { isNotNullOrUndefined } from '../../utils';
import { AuthForm } from '../../components/AuthForm/AuthForm';
import { ROUTES } from '../../constants/routes';
import { useAuthNEW } from '../../hooks/auth/useAuthNEW';

export const Login: React.FC = () => {
  const { login } = useAuthNEW();
  const navigate = useNavigate();

  const handleLogin: SubmitHandler<AuthPayload> = async ({ email, password }) => {
    const { message, error } = await login.mutateAsync({ email, password });

    if (isNotNullOrUndefined(error)) {
      alert(message + error);
      return null;
    }

    alert(message);
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
