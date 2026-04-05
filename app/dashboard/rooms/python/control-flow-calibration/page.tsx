import PythonRoomShell from '@/src/features/rooms/PythonRoomShell';
import { requireAuthenticatedProfile } from '@/src/lib/supabase/route-guards';

export default async function DashboardPythonControlFlowCalibrationPage() {
  await requireAuthenticatedProfile({
    unauthenticatedRedirect: '/login?message=Log%20in%20to%20open%20the%20Python%20Room.&kind=info',
  });

  return <PythonRoomShell />;
}
