import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AuthPayload } from '../../components/AuthForm/types/auth-payload-schema';
import { isNotNullOrUndefined } from '../../utils';
import { AuthForm } from '../../components/AuthForm/AuthForm';
import { ROUTES } from '../../constants/routes';
import { useAuth } from '../../hooks/auth/useAuth';

export const Register: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSignUp: SubmitHandler<AuthPayload> = async ({ email, password }) => {
    const { message, error } = await register({ email, password });

    if (isNotNullOrUndefined(error)) {
      alert(error);
      return null;
    }

    alert(message);
    return navigate(ROUTES.HOME);
  };

  return (
    <div className="max-w-xs flex flex-col justify-center items-center gap-12 w-full">
      <h1 className="text-5xl">Sign Up</h1>
      <AuthForm
        onSubmit={handleSignUp}
        buttonText="Sign Up"
      />
    </div>
  );
};
