import { requireAuthenticatedProfile } from '@/src/lib/supabase/route-guards';

type ClassroomPageProps = {
  searchParams?: Promise<{
    topic?: string | string[];
    mode?: string | string[];
  }>;
};

function readSearchParam(value: string | string[] | undefined, fallback: string) {
  if (Array.isArray(value)) {
    return value[0] || fallback;
  }

  return value || fallback;
}

export default async function ClassroomPage({ searchParams }: ClassroomPageProps) {
  await requireAuthenticatedProfile({
    unauthenticatedRedirect: '/login?message=Log%20in%20to%20open%20the%20classroom.&kind=info',
  });

  const params = searchParams ? await searchParams : undefined;
  const topic = readSearchParam(params?.topic, 'General Study');
  const mode = readSearchParam(params?.mode, 'Standard');

  return (
    <main className="flex h-screen w-screen flex-col overflow-hidden bg-slate-950 text-slate-50">
      <nav className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
        <div>
          <div className="text-xs uppercase tracking-[0.24em] text-slate-500">Yantra Classroom</div>
          <h1 className="mt-2 text-lg font-semibold tracking-tight text-white">Student Placeholder Shell</h1>
        </div>
        <div className="flex gap-5 text-xs uppercase tracking-[0.22em] text-slate-400">
          <span>Topic: {topic}</span>
          <span>Mode: {mode}</span>
        </div>
      </nav>

      <section className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-3xl space-y-6 text-center">
          <div className="flex aspect-video items-center justify-center rounded-[2rem] border border-dashed border-slate-700 bg-slate-900">
            <p className="text-sm font-medium text-slate-500">Student classroom stream placeholder</p>
          </div>
          <p className="text-sm leading-6 text-slate-400">
            This route is a protected shell for the future classroom experience. Topic and mode are already readable from
            the URL so the real classroom surface can attach later without changing the route shape.
          </p>
        </div>
      </section>
    </main>
  );
}
