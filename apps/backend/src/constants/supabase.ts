import { ErrorCode } from '@supabase/auth-js/src/lib/error-codes';

export const supabaseErrorCodes: Record<string, ErrorCode> = {
  userAlreadyExists: 'user_already_exists',
};
