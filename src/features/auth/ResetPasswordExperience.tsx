'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { ArrowRight, Eye, EyeOff, KeyRound, ShieldCheck } from 'lucide-react';
import { useEffect, useState, type FormEvent } from 'react';
import { createClient as createSupabaseBrowserClient } from '@/src/lib/supabase/client';
import { usePageTransition } from '@/src/features/motion/ExperienceProvider';

type ResetStatus =
  | {
      kind: 'error' | 'info' | 'success';
      message: string;
    }
  | null;

function ResetAtmosphere() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden bg-[#050505]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_30%),radial-gradient(circle_at_82%_18%,rgba(255,255,255,0.06),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_22%,transparent_82%,rgba(255,255,255,0.04))]" />
        <div className="absolute left-[-8%] top-[8%] h-[30rem] w-[30rem] rounded-full bg-white/[0.06] blur-[130px]" />
        <div className="absolute right-[-10%] top-[-10%] h-[34rem] w-[34rem] rounded-full bg-white/[0.05] blur-[150px]" />
        <div className="absolute bottom-[-22%] left-[18%] h-[36rem] w-[38rem] rounded-full bg-white/[0.04] blur-[170px]" />
      </div>

      <div className="pointer-events-none fixed left-[24%] top-0 hidden h-full w-px bg-white/6 md:block" />
      <div className="pointer-events-none fixed left-0 top-[28%] hidden h-px w-full bg-white/6 md:block" />
    </>
  );
}

function FieldLabel({ children }: { children: string }) {
  return <label className="block font-mono text-[10px] uppercase tracking-[0.24em] text-white/42">{children}</label>;
}

function PasswordField({
  label,
  value,
  error,
  visible,
  onToggle,
  onChange,
}: {
  label: string;
  value: string;
  error?: string;
  visible: boolean;
  onToggle: () => void;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <FieldLabel>{label}</FieldLabel>
      <div className="relative flex items-center">
        <input
          type={visible ? 'text' : 'password'}
          value={value}
          placeholder="Create a secure password"
          onChange={(event) => onChange(event.target.value)}
          className={`hoverable w-full border-b bg-transparent py-3 text-base text-white outline-none transition-colors placeholder:text-white/12 md:text-sm ${
            error ? 'border-red-300/60' : 'border-white/20 focus:border-white'
          }`}
        />
        <button
          type="button"
          className="hoverable absolute right-0 text-white/40 transition-colors hover:text-white"
          onClick={onToggle}
          aria-label={visible ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
        >
          {visible ? <EyeOff size={14} /> : <Eye size={14} />}
        </button>
      </div>
      {error ? <p className="text-[11px] text-red-200/90">{error}</p> : null}
    </div>
  );
}

export default function ResetPasswordExperience({
  supabaseConfigured,
  initialStatus = null,
}: {
  supabaseConfigured: boolean;
  initialStatus?: ResetStatus;
}) {
  const router = useRouter();
  const { startPageTransition } = usePageTransition();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [status, setStatus] = useState<ResetStatus>(initialStatus);
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!supabaseConfigured) {
      return;
    }

    let cancelled = false;

    async function loadRecoveryState() {
      try {
        const supabase = createSupabaseBrowserClient();
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (cancelled) {
          return;
        }

        if (error || !user) {
          setStatus({
            kind: 'info',
            message: 'Open the password reset link from your email first, then set a new password here.',
          });
          setIsReady(false);
          return;
        }

        setIsReady(true);
        setStatus((current) =>
          current ?? {
            kind: 'info',
            message: 'Create a new password for your Yantra account, then continue into the platform.',
          },
        );
      } catch {
        if (!cancelled) {
          setStatus({
            kind: 'error',
            message: 'Yantra could not confirm your recovery session right now. Please request a new reset email.',
          });
        }
      }
    }

    void loadRecoveryState();

    return () => {
      cancelled = true;
    };
  }, [supabaseConfigured]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: { password?: string; confirmPassword?: string } = {};

    if (!password.trim()) {
      nextErrors.password = 'Enter a new password.';
    } else if (password.length < 8) {
      nextErrors.password = 'Use at least 8 characters.';
    }

    if (!confirmPassword.trim()) {
      nextErrors.confirmPassword = 'Confirm your new password.';
    } else if (confirmPassword !== password) {
      nextErrors.confirmPassword = 'Passwords do not match yet.';
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus({
        kind: 'error',
        message: 'Check the highlighted fields before continuing.',
      });
      return;
    }

    if (!supabaseConfigured) {
      setStatus({
        kind: 'error',
        message: 'Supabase is not configured yet. Add your project credentials to enable password recovery.',
      });
      return;
    }

    if (!isReady) {
      setStatus({
        kind: 'error',
        message: 'Open the recovery link from your email first, then try again.',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        throw error;
      }

      setStatus({
        kind: 'success',
        message: 'Password updated. Opening your workspace...',
      });
      startPageTransition();
      router.replace('/dashboard');
      router.refresh();
    } catch (error) {
      setStatus({
        kind: 'error',
        message: error instanceof Error ? error.message : 'Yantra could not update your password right now.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <ResetAtmosphere />

      <header className="fixed left-0 top-0 z-40 w-full px-6 py-6 md:px-8">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4">
          <Link href="/" className="font-heading text-3xl tracking-wider text-white hoverable">
            YANTRA<span className="text-white/45">.</span>
          </Link>

          <Link
            href="/login"
            className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/62 transition-colors hover:bg-white/[0.08] hover:text-white"
          >
            Back to Login
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto flex min-h-screen max-w-[1500px] flex-col px-4 pb-12 pt-24 md:px-8 md:pb-20 md:pt-28 xl:flex-row xl:items-center xl:gap-10">
        <section className="w-full xl:max-w-[32rem] xl:pr-4">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-[30px] md:p-8"
          >
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.72)] animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/46">Account Recovery</span>
            </div>

            <div className="mt-8 space-y-5">
              <h1 className="font-display text-5xl font-semibold leading-[0.9] tracking-tight text-white md:text-6xl">
                Set a new
                <br />
                password.
              </h1>

              <p className="max-w-xl text-sm leading-relaxed text-white/58 md:text-base">
                Finish the recovery flow with a fresh password, then continue back into your Yantra workspace without
                losing momentum.
              </p>
            </div>

            <div className="mt-8 space-y-4 rounded-[1.6rem] border border-white/8 bg-black/24 p-5">
              <div className="flex items-center gap-3">
                <ShieldCheck size={18} className="text-white/62" />
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">Recovery Flow</div>
                  <div className="mt-1 text-sm text-white/80">Password reset links stay tied to your authenticated recovery session.</div>
                </div>
              </div>

              <div className="rounded-[1.3rem] border border-white/8 bg-white/[0.04] p-4">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
                  <KeyRound size={14} />
                  <span>Security tip</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-white/56">
                  Use at least 8 characters and choose a password you are not reusing anywhere else.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="mt-6 flex-1 xl:mt-0 xl:max-w-[36rem]">
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 shadow-[0_30px_120px_rgba(0,0,0,0.4)] backdrop-blur-[32px] md:p-8"
          >
            <div className="mb-6 border-b border-white/8 pb-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/38">Recovery complete</p>
              <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-white md:text-4xl">
                Secure the account, then jump back in.
              </h2>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <PasswordField
                label="New Password"
                value={password}
                error={errors.password}
                visible={showPassword}
                onToggle={() => setShowPassword((current) => !current)}
                onChange={setPassword}
              />

              <PasswordField
                label="Confirm Password"
                value={confirmPassword}
                error={errors.confirmPassword}
                visible={showConfirm}
                onToggle={() => setShowConfirm((current) => !current)}
                onChange={setConfirmPassword}
              />

              {status ? (
                <div
                  className={`rounded-[1.4rem] border px-4 py-4 text-sm leading-relaxed ${
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

              <div className="flex flex-col gap-4 border-t border-white/8 pt-6 md:flex-row md:items-center md:justify-between">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/34">
                  Ready when your recovery session is active.
                </div>

                <button
                  type="submit"
                  disabled={!supabaseConfigured || !isReady || isSubmitting}
                  className="flex h-14 items-center justify-center gap-2 rounded-[1.2rem] bg-white px-6 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-black transition-all duration-300 hover:scale-[0.99] disabled:cursor-not-allowed disabled:bg-white/35"
                >
                  <span>{isSubmitting ? 'Updating password...' : 'Save and Continue'}</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </form>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
