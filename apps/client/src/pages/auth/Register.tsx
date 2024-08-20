import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AuthPayload } from '../../components/AuthForm/types/auth-payload-schema';
import { AuthForm } from '../../components/AuthForm/AuthForm';
import { ROUTES } from '../../constants/routes';
import toast from 'react-hot-toast';
import { useRegister } from '../../hooks/auth/useRegister';

export const Register: React.FC = () => {
  const { mutateAsync: register } = useRegister();
  const navigate = useNavigate();

  const handleSignUp: SubmitHandler<AuthPayload> = ({ email, password }) => {
    toast.promise(register({ email, password }), {
      loading: 'Signing Up...',
      success: () => {
        navigate(ROUTES.HOME);
        return 'Signed up successfully';
      },
      error: (err) => err.toString(),
    });
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
