import { User } from '@supabase/supabase-js';
import { supabaseBACKEND } from '../supabase/supabseClient';

export default {
  getUserByToken,
};

async function getUserByToken(token: string): Promise<User | null> {
  try {
    const {
      data: { user },
      error,
    } = await supabaseBACKEND.auth.getUser(token);

    if (error) throw error;

    return user;
  } catch (error) {
    console.error('Error Authenticating user from Supabase', error);
    return null;
  }
}
