import { AuthError, isAuthApiError, User } from '@supabase/supabase-js';
import { supabase } from '../supabase/supabseClient';
import { supabaseErrorCodes } from '../constants/supabase';
import { isNullOrUndefined } from '../utils/types';

export async function getUserByToken(token?: string): Promise<User | null> {
  if (isNullOrUndefined(token)) return null;

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser(token);

    return user;
  } catch (error) {
    console.error('Error Authenticating user from Supabase', error);
    throw error;
  }
}

export const isUserExistsError = (error: AuthError) => {
  return isAuthApiError(error) && error.code === supabaseErrorCodes.userAlreadyExists;
};
