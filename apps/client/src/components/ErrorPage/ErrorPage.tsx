import React from 'react';
import { useRouteError } from 'react-router-dom';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { Loader } from '../Loader/Loader';

export const ErrorPage: React.FC = () => {
  const error = useRouteError();

  return (
    <div
      id="error-page"
      className="flex flex-col gap-8 justify-center items-center h-screen w-full"
    >
      <div className="flex">
        <h1 className="text-5xl font-bold">Oops!</h1>
        <Loader className="w-12 mx-4" />
      </div>
      <h1 className="text-2xl">Sorry, an unexpected error has occurred.</h1>
      <ErrorMessage error={error} />
    </div>
  );
};
