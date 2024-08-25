import { AuthError, isAuthApiError, User } from '@supabase/supabase-js';
import { supabase } from '../supabase/supabseClient';
import { supabaseErrorCodes } from '../constants/supabase';

export default {
  getUserByToken,
};

async function getUserByToken(token: string): Promise<User | null> {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error) return null;

    return user;
  } catch (error) {
    console.error('Error Authenticating user from Supabase', error);
    return null;
  }
}

export const isUserExistsError = (error: AuthError) => {
  return isAuthApiError(error) && error.code === supabaseErrorCodes.userAlreadyExists;
};
