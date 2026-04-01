import ResetPasswordExperience from '@/src/features/auth/ResetPasswordExperience';
import { hasSupabaseEnv } from '@/src/lib/supabase/env';

type ResetPasswordPageProps = {
  searchParams?: Promise<{
    message?: string | string[];
    kind?: string | string[];
  }>;
};

type ResetStatus =
  | {
      kind: 'error' | 'info' | 'success';
      message: string;
    }
  | null;

function readSearchParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const params = searchParams ? await searchParams : undefined;
  const supabaseConfigured = hasSupabaseEnv();
  const message = readSearchParam(params?.message);
  const kind = readSearchParam(params?.kind);

  const initialStatus: ResetStatus = message
    ? {
        kind: kind === 'error' || kind === 'success' || kind === 'info' ? kind : 'info',
        message,
      }
    : !supabaseConfigured
      ? {
          kind: 'info',
          message: 'Supabase is not configured yet. Add your project credentials locally, then reload this page.',
        }
      : null;

  return <ResetPasswordExperience supabaseConfigured={supabaseConfigured} initialStatus={initialStatus} />;
}
