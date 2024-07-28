import React, { useEffect, useState } from 'react';
import {
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
  User,
} from '@supabase/supabase-js';
import { supabase } from '../supabase/supabseClient';
import { isNotNullOrUndefined } from '../utils/arrays';
import { Loader } from '../components';

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
    signUp: (credentials: SignUpWithPasswordCredentials) => supabase.auth.signUp(credentials),
    signIn: (credentials: SignInWithPasswordCredentials) =>
      supabase.auth.signInWithPassword(credentials),
    signOut: () => supabase.auth.signOut(),
    user,
  };

  return (
    <AuthContext.Provider value={value}>{isLoading ? <Loader /> : children}</AuthContext.Provider>
  );
};
