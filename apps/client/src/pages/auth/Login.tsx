import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AuthPayload } from '../../components/AuthForm/types/auth-payload-schema';
import { AuthForm } from '../../components/AuthForm/AuthForm';
import { ROUTES } from '../../constants/routes';
import toast from 'react-hot-toast';
import { useLogin } from '../../hooks/auth/useLogin';

export const Login: React.FC = () => {
  const { mutateAsync: login } = useLogin();

  const navigate = useNavigate();

  const handleLogin: SubmitHandler<AuthPayload> = ({ email, password }) => {
    toast.promise(login({ email, password }), {
      loading: 'Signing in...',
      success: ({ message }) => {
        navigate(ROUTES.HOME);
        return message;
      },
      error: (err) => err.toString(),
    });
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
