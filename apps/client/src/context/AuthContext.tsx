import React, { useEffect } from 'react';
import {
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
  User,
} from '@supabase/supabase-js';
import { supabase } from '../supabase/supabseClient';
import { QueryWrapper } from '../components';
import { useQueryClient } from '@tanstack/react-query';
import { useSession } from '../hooks/auth/useSession';

type AuthContextType = {
  signUp: typeof supabase.auth.signUp;
  signIn: typeof supabase.auth.signInWithPassword;
  signOut: typeof supabase.auth.signOut;
  user: User | null;
};

export const AuthContext = React.createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const queryClient = useQueryClient();
  const sessionQueryResults = useSession();

  useEffect(() => {
    const {
      data: { subscription: listener },
    } = supabase.auth.onAuthStateChange(() => {
      void queryClient.invalidateQueries({ queryKey: ['session'] });
    });

    return () => {
      listener?.unsubscribe();
    };
  }, [queryClient]);

  const returnedAuthObject = createAuthContextReturnedObject(sessionQueryResults);

  return (
    <AuthContext.Provider value={returnedAuthObject}>
      <QueryWrapper queryResults={sessionQueryResults}>{children}</QueryWrapper>
    </AuthContext.Provider>
  );
};

function createAuthContextReturnedObject(
  sessionQueryResults: ReturnType<typeof useSession>,
): AuthContextType {
  return {
    signUp: (credentials: SignUpWithPasswordCredentials) => supabase.auth.signUp(credentials),
    signIn: (credentials: SignInWithPasswordCredentials) =>
      supabase.auth.signInWithPassword(credentials),
    signOut: () => supabase.auth.signOut(),
    user: sessionQueryResults?.data?.user ?? null,
  };
}
