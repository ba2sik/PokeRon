import React, { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../supabase/supabseClient';
import { isNotNullOrUndefined } from '../utils/arrays';
import { Loader } from '../components';
// import { supabase } from '../supabase/supabseClient';

// const SupabaseAuthMethods = {
//   SignIn: 'signInWithPassword',
//   SignUp: 'signUp',
// } as const;
//
// type SupabaseAuthMethod = (typeof SupabaseAuthMethods)[keyof typeof SupabaseAuthMethods];
//
// type AuthMethods = Pick<typeof supabase.auth, SupabaseAuthMethod>;
// type CredentialsType<AuthMethod extends keyof AuthMethods> = Parameters<AuthMethods[AuthMethod]>[0];
//
// const handleAuth = async <AuthMethod extends keyof AuthMethods>(
//   authMethod: AuthMethod,
//   authPayload: CredentialsType<AuthMethod>,
// ) => {
//   const { data, error } = await supabase.auth[authMethod](authPayload);
// };

type AuthContextType = {
  signUp: typeof supabase.auth.signUp;
  signIn: typeof supabase.auth.signInWithPassword;
  signOut: typeof supabase.auth.signOut;
  user: User | null;
};

// TODO: figure out how to use this type without adding "isUserChangedEventType" function
// type UserChangedEventType = Extract<AuthChangeEvent, 'SIGNED_IN' | 'USER_UPDATED' | 'TOKEN_REFRESHED'>;
const UserChangedEvents = ['SIGNED_IN', 'USER_UPDATED', 'TOKEN_REFRESHED'];
const SIGN_OUT_EVENT = 'SIGNED_OUT';

export const AuthContext = React.createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUserFromLocalStorage = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (isNotNullOrUndefined(session)) {
        setUser(session.user ?? null);
      }

      setIsLoading(false);
    };

    loadUserFromLocalStorage();
  }, []);

  useEffect(() => {
    const {
      data: { subscription: listener },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (isNotNullOrUndefined(session) && UserChangedEvents.includes(event)) {
        setUser(session.user ?? null);
      }

      if (event === SIGN_OUT_EVENT) {
        setUser(null);
      }

      setIsLoading(false);
    });

    return () => {
      listener?.unsubscribe();
    };
  }, []);

  const value = {
    signUp: supabase.auth.signUp,
    signIn: supabase.auth.signInWithPassword,
    signOut: supabase.auth.signOut,
    user,
  };

  return (
    <AuthContext.Provider value={value}>{isLoading ? <Loader /> : children}</AuthContext.Provider>
  );
};
