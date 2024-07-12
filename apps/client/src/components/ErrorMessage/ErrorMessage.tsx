import React from 'react';
import { isAxiosError } from 'axios';

type ErrorProps = {
  error: Error | null;
};

const ErrorMessage: React.FC<ErrorProps> = ({ error }) => {
  if (isAxiosError(error)) {
    return <h1>{error.message}</h1>;
  }

  return <h1>{`Unknown error: ${error}`}</h1>;
};

export default ErrorMessage;
