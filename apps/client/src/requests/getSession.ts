import { supabase } from '../supabase/supabseClient';
import { Session } from '@supabase/supabase-js';

export const getSession = async (): Promise<Session | null> => {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    return session;
  } catch (e) {
    console.error('Error loading session from local storage', e);
    throw e;
  }
};
