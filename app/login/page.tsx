import AuthExperience from '@/src/features/auth/AuthExperience';
import { hasSupabaseEnv } from '@/src/lib/supabase/env';
import { redirectAuthenticatedUserToApp } from '@/src/lib/supabase/route-guards';

type LoginPageProps = {
  searchParams?: Promise<{
    message?: string | string[];
    kind?: string | string[];
  }>;
};

function readSearchParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = searchParams ? await searchParams : undefined;
  const supabaseConfigured = hasSupabaseEnv();

  if (supabaseConfigured) {
    await redirectAuthenticatedUserToApp();
  }

  const message = readSearchParam(params?.message);
  const kind = readSearchParam(params?.kind);

  return (
    <AuthExperience
      mode="login"
      supabaseConfigured={supabaseConfigured}
      initialStatus={
        message
          ? {
              kind: kind === 'error' || kind === 'success' || kind === 'info' ? kind : 'info',
              message,
            }
          : !supabaseConfigured
            ? {
                kind: 'info',
                message:
                  'Supabase is not configured yet. Add your Supabase URL and anon key locally, then reload this page.',
              }
            : null
      }
    />
  );
}
