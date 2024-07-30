import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { isNullOrUndefined } from '../../utils/types';

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (isNullOrUndefined(context)) {
    throw Error('useAuth can only be used inside an AuthProvider');
  }

  return context;
};
