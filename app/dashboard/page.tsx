import StudentDashboard from '@/src/features/dashboard/StudentDashboard';
import { requireAuthenticatedProfile } from '@/src/lib/supabase/route-guards';
import { getAuthenticatedDashboardData } from '@/src/lib/supabase/dashboard';

export default async function DashboardPage() {
  const profileResult = await requireAuthenticatedProfile({
    unauthenticatedRedirect: '/login?message=Log%20in%20to%20open%20your%20dashboard.&kind=info',
  });

  const result = await getAuthenticatedDashboardData(profileResult);

  if (!result) {
    return null;
  }

  return <StudentDashboard data={result} />;
}
