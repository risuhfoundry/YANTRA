import StudentDashboard from '@/src/features/dashboard/StudentDashboard';
import { getFirstName } from '@/src/features/dashboard/student-profile-model';
import { requireAuthenticatedProfile } from '@/src/lib/supabase/route-guards';

export default async function DashboardPage() {
  const result = await requireAuthenticatedProfile({
    unauthenticatedRedirect: '/login?message=Log%20in%20to%20open%20your%20dashboard.&kind=info',
    requireOnboarding: true,
    onboardingRedirect: '/onboarding?message=Choose%20your%20Yantra%20role%20before%20entering%20the%20dashboard.&kind=info',
  });

  return (
    <StudentDashboard
      fullName={result.profile.name}
      firstName={getFirstName(result.profile.name)}
      email={result.user.email ?? ''}
      profile={result.profile}
    />
  );
}
