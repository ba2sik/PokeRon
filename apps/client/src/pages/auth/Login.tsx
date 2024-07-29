import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AuthPayload } from '../../components/AuthForm/types/auth-payload-schema';
import { isNotNullOrUndefined } from '../../utils/arrays';
import { useAuth } from '../../hooks/auth/useAuth';
import { AuthForm } from '../../components/AuthForm/AuthForm';

export const Login: React.FC = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleLogin: SubmitHandler<AuthPayload> = async ({ email, password }) => {
    const { data, error } = await signIn({ email, password });

    if (isNotNullOrUndefined(error)) {
      alert(error.message);
      return null;
    }

    alert(data?.user?.email + ' signed in successfully');
    return navigate('/');
  };

  return (
    <div className="max-w-xs flex flex-col justify-center items-center gap-12 h-screen w-full">
      <h1 className="text-5xl">Sign In</h1>
      <AuthForm
        onSubmit={handleLogin}
        buttonText="Sign In"
      />
    </div>
  );
};
