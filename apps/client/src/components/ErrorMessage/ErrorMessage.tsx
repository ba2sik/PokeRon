import React from 'react';
import { isAxiosError } from 'axios';
import { isRouteErrorResponse } from 'react-router-dom';

type ErrorProps = {
  error: unknown;
};

export const ErrorMessage: React.FC<ErrorProps> = ({ error }) => {
  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.data || error.statusText;
  } else if (isAxiosError(error) || error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = 'Unknown error';
  }

  return (
    <p className="text-red-500 text-xs italic">
      <i>{errorMessage}</i>
    </p>
  );
};
