import React, { PropsWithChildren } from 'react';
import { UseQueryResult } from '@tanstack/react-query';
import Loader from '../Loader/Loader';
import { isNotNullOrUndefined } from '../../utils/arrays';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

type QueryWrapperProps = PropsWithChildren<{
  queryResults: UseQueryResult;
}>;

const QueryWrapper: React.FC<QueryWrapperProps> = ({ queryResults, children }) => {
  const { error, isLoading } = queryResults;

  if (isLoading) {
    return <Loader />;
  }

  if (isNotNullOrUndefined(error)) {
    return <ErrorMessage error={error} />;
  }

  return children;
};

export default QueryWrapper;
