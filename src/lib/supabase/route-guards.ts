import { cache } from 'react';
import { redirect } from 'next/navigation';
import { isOnboardingComplete } from '@/src/features/dashboard/student-profile-model';
import { hasSupabaseEnv } from './env';
import { getAuthenticatedProfile } from './profiles';

type AuthenticatedProfileResult = NonNullable<Awaited<ReturnType<typeof getAuthenticatedProfile>>>;

type RequireAuthenticatedProfileOptions = {
  unauthenticatedRedirect: string;
  requireOnboarding?: boolean;
  onboardingRedirect?: string;
  supabaseRedirect?: string;
};

const getCachedAuthenticatedProfile = cache(getAuthenticatedProfile);

export function requireSupabaseConfigured(
  redirectTo = '/login?message=Configure%20Supabase%20first.&kind=error',
) {
  if (!hasSupabaseEnv()) {
    redirect(redirectTo);
  }
}

export async function redirectAuthenticatedUserToApp() {
  if (!hasSupabaseEnv()) {
    return null;
  }

  const result = await getCachedAuthenticatedProfile();

  if (result) {
    redirect('/dashboard');
  }

  return null;
}

export async function requireAuthenticatedProfile({
  unauthenticatedRedirect,
  requireOnboarding = false,
  onboardingRedirect = '/onboarding?message=Complete%20your%20Yantra%20onboarding%20before%20continuing.&kind=info',
  supabaseRedirect,
}: RequireAuthenticatedProfileOptions): Promise<AuthenticatedProfileResult> {
  requireSupabaseConfigured(supabaseRedirect);

  const result = await getCachedAuthenticatedProfile();

  if (!result) {
    redirect(unauthenticatedRedirect);
  }

  if (
    requireOnboarding &&
    result.supportsOnboardingSchema &&
    !isOnboardingComplete(result.profile, {
      requireProfileDetails: result.supportsEnhancedOnboardingSchema,
    })
  ) {
    redirect(onboardingRedirect);
  }

  return result;
}
