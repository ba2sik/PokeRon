import { User } from '@supabase/supabase-js';
import { supabase } from '../supabase/supabseClient';

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
