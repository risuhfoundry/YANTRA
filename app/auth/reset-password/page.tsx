import ResetPasswordExperience from '@/src/features/auth/ResetPasswordExperience';
import { hasSupabaseEnv } from '@/src/lib/supabase/env';

export default function ResetPasswordPage() {
  return <ResetPasswordExperience supabaseConfigured={hasSupabaseEnv()} />;
}
