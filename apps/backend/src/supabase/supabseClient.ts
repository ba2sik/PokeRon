import { createClient } from '@supabase/supabase-js';
import { env } from '../env/env';

const supabaseUrl = env.SUPABASE_URL;
const supabaseAnonKey = env.SUPABASE_ANON_KEY;

export const supabaseBACKEND = createClient(supabaseUrl, supabaseAnonKey);