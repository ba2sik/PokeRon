import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthPayload, authPayloadSchema } from './types/auth-payload-schema';
import { FormInput } from './FormInput';

type AuthFormType = {
  onSubmit: SubmitHandler<AuthPayload>;
  buttonText: string;
};

export const AuthForm: React.FC<AuthFormType> = ({ onSubmit, buttonText = 'Submit' }) => {
  const formMethods = useForm<AuthPayload>({ resolver: zodResolver(authPayloadSchema) });

  return (
    <FormProvider {...formMethods}>
      <form
        className="bg-white shadow-md rounded p-8 w-[22rem]"
        onSubmit={formMethods.handleSubmit(onSubmit)}
      >
        <FormInput
          fieldName="email"
          placeholder="example@gmail.com"
          type="email"
        />
        <FormInput
          fieldName="password"
          placeholder="******"
          type="password"
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
    </FormProvider>
  );
};
