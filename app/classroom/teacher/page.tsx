import { requireAuthenticatedProfile } from '@/src/lib/supabase/route-guards';

export default async function ClassroomTeacherPage() {
  await requireAuthenticatedProfile({
    unauthenticatedRedirect: '/login?message=Log%20in%20to%20open%20the%20teacher%20classroom.&kind=info',
  });

  return (
    <main className="h-screen w-screen overflow-hidden bg-slate-950 px-8 py-8 text-white">
      <header className="mb-8">
        <div className="text-xs uppercase tracking-[0.24em] text-slate-500">Teacher Classroom</div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">Classroom Orchestrator Placeholder</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
          This protected shell is reserved for the future teacher control surface. It is intentionally simple and does
          not include live orchestration logic yet.
        </p>
      </header>

      <section className="grid h-[calc(100vh-11rem)] grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-[1.75rem] border border-slate-800 bg-slate-900 p-6">
          <div className="text-xs uppercase tracking-[0.22em] text-slate-500">Student Progress</div>
          <div className="mt-6 space-y-4">
            <div className="h-4 w-full rounded bg-slate-800" />
            <div className="h-4 w-3/4 rounded bg-slate-800" />
            <div className="h-4 w-5/6 rounded bg-slate-800" />
          </div>
        </div>

        <div className="md:col-span-2 rounded-[1.75rem] border border-slate-800 bg-black p-6">
          <div className="text-xs uppercase tracking-[0.22em] text-slate-500">Live Classroom Feed</div>
          <div className="flex h-full items-center justify-center text-sm italic text-slate-600">
            Waiting for classroom orchestration data...
          </div>
        </div>
      </section>
    </main>
  );
}
