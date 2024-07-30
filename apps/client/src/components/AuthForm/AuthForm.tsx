import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthPayload, authPayloadSchema } from './types/auth-payload-schema';
import { FormInput } from './FormInput';

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
      <FormInput
        fieldName="email"
        errorMessage={errors.email?.message}
        placeholder="example@gmail.com"
        type="email"
        {...register('email')}
      />
      <FormInput
        fieldName="password"
        errorMessage={errors.password?.message}
        placeholder="******"
        type="password"
        {...register('password')}
      />
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
