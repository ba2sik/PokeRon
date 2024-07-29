import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ErrorMessage } from '../../components';
import { AuthPayload, authPayloadSchema } from './types/auth-payload-schema';

type AuthFormType = {
  onSubmit: SubmitHandler<AuthPayload>;
  buttonText: string;
};

export const AuthForm: React.FC<AuthFormType> = ({ onSubmit, buttonText = 'Submit' }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthPayload>({ resolver: zodResolver(authPayloadSchema) });

  return (
    <form
      className="bg-white shadow-md rounded p-8 w-[22rem]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="text"
          placeholder="Email"
          {...register('email')}
        />
        <div className="ml-1 h-4">
          {errors.email && <ErrorMessage error={errors.email.message} />}
        </div>
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="*********"
          {...register('password')}
        />
        <div className="ml-1 h-4">
          {errors.password && <ErrorMessage error={errors.password.message} />}
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          {buttonText}
        </button>
      </div>
    </form>
  );
};
