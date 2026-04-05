import PythonRoomsIndexPage from '@/src/features/rooms/PythonRoomsIndexPage';
import { requireAuthenticatedProfile } from '@/src/lib/supabase/route-guards';

export default async function DashboardPythonRoomPage() {
  const result = await requireAuthenticatedProfile({
    unauthenticatedRedirect: '/login?message=Log%20in%20to%20open%20the%20Python%20Room.&kind=info',
  });

  return <PythonRoomsIndexPage learnerName={result.profile.name} />;
}
