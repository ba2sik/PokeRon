import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ErrorMessage } from '../../components';
import { useNavigate } from 'react-router-dom';
import { AuthPayload, authPayloadSchema } from './types/auth-payload-schema';
import { isNotNullOrUndefined } from '../../utils/arrays';
import { useAuth } from '../../hooks/auth/useAuth';

export const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthPayload>({ resolver: zodResolver(authPayloadSchema) });
  const { signIn, signUp } = useAuth();
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

  const handleSignUp: SubmitHandler<AuthPayload> = async ({ email, password }) => {
    const { data, error } = await signUp({ email, password });

    if (isNotNullOrUndefined(error)) {
      alert(error.message);
      return null;
    }

    alert(data?.user?.email + ' signed up successfully');
    return navigate('/');
  };

  return (
    <div className="max-w-xs flex flex-col justify-center items-center gap-12 h-screen w-full">
      <h1 className="text-5xl">Admin Page</h1>
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit(handleLogin)}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder="Email"
            {...register('email')}
          />
          {errors.email && <ErrorMessage error={errors.email.message} />}
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="*********"
            {...register('password')}
          />
          {errors.password && <ErrorMessage error={errors.password.message} />}
        </div>
        <div className="flex items-center justify-around">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
          <button
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            onClick={handleSubmit(handleSignUp)}
          >
            Join Now
          </button>
        </div>
      </form>
    </div>
  );
};
