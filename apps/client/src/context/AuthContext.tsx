import React, { useEffect } from 'react';
import {
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
  User,
} from '@supabase/supabase-js';
import { supabase } from '../supabase/supabseClient';
import { QueryWrapper } from '../components';
import { useQueryClient } from '@tanstack/react-query';
import { useConnectedUser } from '../hooks/auth/useConnectedUser';

type AuthContextType = {
  signUp: typeof supabase.auth.signUp;
  signIn: typeof supabase.auth.signInWithPassword;
  signOut: typeof supabase.auth.signOut;
  user: User | null;
};

export type UserType = AuthContextType['user'];

export const AuthContext = React.createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const queryClient = useQueryClient();
  const connectedUserQueryResults = useConnectedUser();

  useEffect(() => {
    const {
      data: { subscription: listener },
    } = supabase.auth.onAuthStateChange(() => {
      void queryClient.invalidateQueries({ queryKey: ['connectedUser'] });
    });

    return () => {
      listener?.unsubscribe();
    };
  }, [queryClient]);

  const returnedAuthObject = createAuthContextReturnedObject(connectedUserQueryResults);

  return (
    <AuthContext.Provider value={returnedAuthObject}>
      <QueryWrapper queryResults={connectedUserQueryResults}>{children}</QueryWrapper>
    </AuthContext.Provider>
  );
};

function createAuthContextReturnedObject(
  connectedUserQueryResults: ReturnType<typeof useConnectedUser>,
): AuthContextType {
  return {
    signUp: (credentials: SignUpWithPasswordCredentials) => supabase.auth.signUp(credentials),
    signIn: (credentials: SignInWithPasswordCredentials) =>
      supabase.auth.signInWithPassword(credentials),
    signOut: () => supabase.auth.signOut(),
    user: connectedUserQueryResults.data ?? null,
  };
}
