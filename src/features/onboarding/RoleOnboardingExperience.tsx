'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { ArrowRight, Check, ShieldCheck, Sparkles, Waypoints } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  onboardingRoleOptions,
  type StudentProfile,
  type UserRole,
} from '@/src/features/dashboard/student-profile-model';
import { usePageTransition } from '@/src/features/motion/ExperienceProvider';

type OnboardingStatus =
  | {
      kind: 'error' | 'info' | 'success';
      message: string;
    }
  | null;

type RoleOnboardingExperienceProps = {
  email: string;
  initialProfile: StudentProfile;
  initialStatus?: OnboardingStatus;
};

function OnboardingAtmosphere() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden bg-[#040404]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(255,255,255,0.08),transparent_28%),radial-gradient(circle_at_82%_14%,rgba(255,255,255,0.08),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_24%,transparent_74%,rgba(255,255,255,0.04))]" />
        <div className="absolute left-[-10%] top-[6%] h-[28rem] w-[28rem] rounded-full bg-white/[0.05] blur-[120px]" />
        <div className="absolute right-[-10%] top-[-10%] h-[34rem] w-[34rem] rounded-full bg-white/[0.05] blur-[150px]" />
        <div className="absolute bottom-[-18%] left-[20%] h-[34rem] w-[38rem] rounded-full bg-white/[0.05] blur-[170px]" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '132px 132px',
            maskImage: 'radial-gradient(circle at center, black 36%, transparent 82%)',
          }}
        />
      </div>

      <div className="pointer-events-none fixed left-[18%] top-0 hidden h-full w-px bg-white/6 xl:block" />
      <div className="pointer-events-none fixed left-0 top-[24%] hidden h-px w-full bg-white/6 xl:block" />
    </>
  );
}

export default function RoleOnboardingExperience({
  email,
  initialProfile,
  initialStatus = null,
}: RoleOnboardingExperienceProps) {
  const router = useRouter();
  const { startPageTransition } = usePageTransition();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(initialProfile.userRole);
  const [status, setStatus] = useState<OnboardingStatus>(initialStatus);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setSelectedRole(initialProfile.userRole);
  }, [initialProfile.userRole]);

  const handleSelectRole = (role: UserRole) => {
    setSelectedRole(role);

    if (status?.kind === 'error') {
      setStatus(null);
    }
  };

  const handleContinue = async () => {
    if (!selectedRole) {
      setStatus({
        kind: 'error',
        message: 'Choose the Yantra role that best matches how you will use the platform.',
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({
      kind: 'info',
      message: 'Saving your onboarding choice and preparing the dashboard...',
    });

    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...initialProfile,
          userRole: selectedRole,
          onboardingCompleted: true,
          onboardingCompletedAt: new Date().toISOString(),
        } satisfies StudentProfile),
      });

      const payload = (await response.json()) as {
        error?: string;
        profile?: StudentProfile;
      };

      if (!response.ok || !payload.profile) {
        if (response.status === 401) {
          window.location.href = '/login?message=Your%20session%20expired.%20Please%20log%20in%20again.&kind=error';
          return;
        }

        throw new Error(payload.error || 'Yantra could not save your onboarding role right now.');
      }

      setStatus({
        kind: 'success',
        message: 'Role saved. Opening your dashboard...',
      });
      startPageTransition();
      router.replace('/dashboard');
      router.refresh();
    } catch (error) {
      setStatus({
        kind: 'error',
        message: error instanceof Error ? error.message : 'Yantra could not save your onboarding role right now.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <OnboardingAtmosphere />

      <header className="fixed left-0 top-0 z-40 w-full px-6 py-6 md:px-8">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4">
          <Link href="/" className="font-heading text-3xl tracking-wider text-white">
            YANTRA<span className="text-white/45">.</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.24em] text-white/40 md:block">
              Role onboarding
            </span>
            <Link
              href="/auth/signout"
              className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/62 transition-colors hover:bg-white/[0.08] hover:text-white"
            >
              Sign Out
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto flex min-h-screen max-w-[1500px] flex-col px-4 pb-12 pt-24 md:px-8 md:pb-20 md:pt-28 xl:flex-row xl:items-start xl:gap-10">
        <section className="w-full xl:sticky xl:top-28 xl:max-w-[28rem] xl:pr-4">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-[30px] md:p-8"
          >
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.72)] animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/46">Step 1 / Role Selection</span>
            </div>

            <div className="mt-8 space-y-5">
              <h1 className="font-display text-5xl font-semibold leading-[0.9] tracking-tight text-white md:text-6xl">
                Choose your
                <br />
                Yantra role.
              </h1>

              <p className="max-w-xl text-sm leading-relaxed text-white/58 md:text-base">
                We use this first choice to shape the platform context after signup. Pick the role that best matches
                how you plan to use Yantra right now.
              </p>
            </div>

            <div className="mt-8 space-y-4 rounded-[1.6rem] border border-white/8 bg-black/24 p-5">
              <div className="flex items-center gap-3">
                <ShieldCheck size={18} className="text-white/62" />
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">Signed In As</div>
                  <div className="mt-1 text-sm text-white/80">{email || initialProfile.name}</div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                <div className="rounded-[1.3rem] border border-white/8 bg-white/[0.04] p-4">
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
                    <Sparkles size={14} />
                    <span>Required before dashboard</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-white/56">
                    Finish this once and the app will take you straight into the main workspace next time.
                  </p>
                </div>

                <div className="rounded-[1.3rem] border border-white/8 bg-white/[0.04] p-4">
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
                    <Waypoints size={14} />
                    <span>Single selection</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-white/56">
                    Choose the one role that best fits your primary use case today.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="mt-6 flex-1 xl:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 shadow-[0_30px_120px_rgba(0,0,0,0.4)] backdrop-blur-[32px] md:p-8"
          >
            <div className="mb-6 flex flex-col gap-3 border-b border-white/8 pb-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/38">PDF-based role options</p>
                <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-white md:text-4xl">
                  Pick the context you need before entering the dashboard.
                </h2>
              </div>

              <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/58">
                6 roles available
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {onboardingRoleOptions.map((option, index) => {
                const selected = selectedRole === option.value;

                return (
                  <motion.button
                    key={option.value}
                    type="button"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className={`group relative overflow-hidden rounded-[1.7rem] border p-5 text-left transition-all duration-300 ${
                      selected
                        ? 'border-white/30 bg-white/[0.11] shadow-[0_24px_60px_rgba(0,0,0,0.22)]'
                        : 'border-white/8 bg-white/[0.03] hover:-translate-y-0.5 hover:border-white/16 hover:bg-white/[0.06]'
                    }`}
                    onClick={() => handleSelectRole(option.value)}
                    aria-pressed={selected}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_44%,rgba(255,255,255,0.02))]" />

                    <div className="relative z-10">
                      <div className="flex items-start justify-between gap-4">
                        <div className="max-w-[18rem]">
                          <div className="font-display text-2xl font-medium leading-[1] text-white">{option.value}</div>
                          <p className="mt-3 text-sm leading-relaxed text-white/58">{option.description}</p>
                        </div>

                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors ${
                            selected ? 'border-white bg-white text-black' : 'border-white/12 bg-white/[0.04] text-white/34'
                          }`}
                        >
                          <Check size={16} />
                        </div>
                      </div>

                      <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
                        {selected ? 'Selected role' : 'Choose this role'}
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {status ? (
              <div
                className={`mt-6 rounded-[1.4rem] border px-4 py-4 text-sm leading-relaxed ${
                  status.kind === 'error'
                    ? 'border-red-300/30 bg-red-400/10 text-red-100'
                    : status.kind === 'success'
                      ? 'border-white/12 bg-white/[0.06] text-white/86'
                      : 'border-white/10 bg-black/20 text-white/68'
                }`}
              >
                {status.message}
              </div>
            ) : null}

            <div className="mt-8 flex flex-col gap-4 border-t border-white/8 pt-6 md:flex-row md:items-center md:justify-between">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/34">
                Your selection will be stored with your Yantra profile.
              </div>

              <button
                type="button"
                disabled={!selectedRole || isSubmitting}
                onClick={handleContinue}
                className="flex h-14 items-center justify-center gap-2 rounded-[1.2rem] bg-white px-6 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-black transition-all duration-300 hover:scale-[0.99] disabled:cursor-not-allowed disabled:bg-white/35"
              >
                <span>{isSubmitting ? 'Saving selection...' : 'Continue to Dashboard'}</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
