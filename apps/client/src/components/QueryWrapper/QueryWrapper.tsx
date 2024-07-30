import React, { PropsWithChildren } from 'react';
import { UseQueryResult } from '@tanstack/react-query';
import { isNotNullOrUndefined } from '../../utils';
import { ErrorMessage, Loader } from '../index';

type QueryWrapperProps = PropsWithChildren<{
  queryResults: UseQueryResult;
}>;

export const QueryWrapper: React.FC<QueryWrapperProps> = ({ queryResults, children }) => {
  const { error, isLoading } = queryResults;

  if (isLoading) {
    return <Loader />;
  }

  if (isNotNullOrUndefined(error)) {
    return <ErrorMessage error={error} />;
  }

  return children;
};
