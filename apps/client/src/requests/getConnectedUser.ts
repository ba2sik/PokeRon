import { supabase } from '../supabase/supabseClient';
import { isNotNullOrUndefined } from '../utils';
import { UserType } from '../context/AuthContext';

export const getConnectedUser = async (): Promise<UserType> => {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (isNotNullOrUndefined(session)) {
      return session.user ?? null;
    }

    return null;
  } catch (e) {
    console.error('Error loading user from local storage', e);
    throw e;
  }
};
