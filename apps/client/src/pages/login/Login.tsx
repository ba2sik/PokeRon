import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ErrorMessage } from '../../components';

const payloadSchema = z
  .object({
    username: z.string().min(1, { message: 'Please Enter Username.' }),
    password: z.string().min(6, { message: 'Password must contain at least 6 Characters' }),
  })
  .strict();

type Inputs = z.infer<typeof payloadSchema>;

export const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(payloadSchema) });
  const onSubmit: SubmitHandler<Inputs> = (data) => alert(JSON.stringify(data));

  const username = watch('username');
  const password = watch('password');

  console.log({ username, password }); // watch input value by passing the name of it

  return (
    <div className="max-w-xs flex flex-col justify-center items-center gap-12 h-screen w-full">
      <h1 className="text-5xl">Admin Page</h1>
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            {...register('username')}
          />
          {errors.username && <ErrorMessage error={errors.username.message} />}
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
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#"
          >
            Join Now
          </a>
        </div>
      </form>
    </div>
  );
};
