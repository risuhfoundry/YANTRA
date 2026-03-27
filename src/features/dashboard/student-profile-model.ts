export const onboardingRoleOptions = [
  {
    value: 'School Student (12-18)',
    description: 'Learn AI fundamentals on smartboards.',
  },
  {
    value: 'College Student (18-25)',
    description: 'Deep dive into ML and build portfolios.',
  },
  {
    value: 'Self-Learner (Any Age)',
    description: 'Skill up at your own pace from home.',
  },
  {
    value: 'Teacher / Educator',
    description: 'Assign lessons and track class progress.',
  },
  {
    value: 'Institution / School',
    description: 'Integrate AI education into curriculum.',
  },
  {
    value: 'Hiring Company',
    description: 'Find pre-screened AI talent.',
  },
] as const;

export type UserRole = (typeof onboardingRoleOptions)[number]['value'];

export type StudentProfile = {
  name: string;
  classDesignation: string;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  progress: number;
  academicYear: string;
  userRole: UserRole | null;
  onboardingCompleted: boolean;
  onboardingCompletedAt: string | null;
};

export const defaultStudentProfile: StudentProfile = {
  name: 'Yantra Learner',
  classDesignation: 'Class 10',
  skillLevel: 'Beginner',
  progress: 0,
  academicYear: '2026',
  userRole: null,
  onboardingCompleted: false,
  onboardingCompletedAt: null,
};

export function normalizeUserRole(value: unknown): UserRole | null {
  return onboardingRoleOptions.some((option) => option.value === value) ? (value as UserRole) : null;
}

function normalizeOnboardingCompletedAt(value: unknown) {
  if (typeof value !== 'string' || !value.trim()) {
    return null;
  }

  const parsed = new Date(value);

  return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
}

export function isOnboardingComplete(profile: Pick<StudentProfile, 'userRole' | 'onboardingCompleted'>) {
  return Boolean(profile.onboardingCompleted && normalizeUserRole(profile.userRole));
}

export function getAuthenticatedAppPath(profile: Pick<StudentProfile, 'userRole' | 'onboardingCompleted'>) {
  return isOnboardingComplete(profile) ? '/dashboard' : '/onboarding';
}

export function sanitizeStudentProfile(profile: StudentProfile): StudentProfile {
  const safeName = profile.name.trim() || defaultStudentProfile.name;
  const safeClassDesignation = profile.classDesignation.trim() || defaultStudentProfile.classDesignation;
  const safeAcademicYear = profile.academicYear.trim() || defaultStudentProfile.academicYear;
  const safeProgress = Number.isFinite(profile.progress) ? Math.max(0, Math.min(100, Math.round(profile.progress))) : 0;
  const safeUserRole = normalizeUserRole(profile.userRole);
  const safeOnboardingCompleted = Boolean(profile.onboardingCompleted && safeUserRole);

  return {
    name: safeName,
    classDesignation: safeClassDesignation,
    academicYear: safeAcademicYear,
    skillLevel:
      profile.skillLevel === 'Advanced' || profile.skillLevel === 'Intermediate' || profile.skillLevel === 'Beginner'
        ? profile.skillLevel
        : defaultStudentProfile.skillLevel,
    progress: safeProgress,
    userRole: safeUserRole,
    onboardingCompleted: safeOnboardingCompleted,
    onboardingCompletedAt: safeOnboardingCompleted ? normalizeOnboardingCompletedAt(profile.onboardingCompletedAt) : null,
  };
}

export function normalizeStudentProfileInput(value: unknown) {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const candidate = value as Partial<StudentProfile>;

  if (
    typeof candidate.name !== 'string' ||
    typeof candidate.classDesignation !== 'string' ||
    typeof candidate.academicYear !== 'string' ||
    typeof candidate.progress !== 'number' ||
    (candidate.skillLevel !== 'Beginner' &&
      candidate.skillLevel !== 'Intermediate' &&
      candidate.skillLevel !== 'Advanced')
  ) {
    return null;
  }

  if (
    ('userRole' in candidate && candidate.userRole !== null && candidate.userRole !== undefined && typeof candidate.userRole !== 'string') ||
    ('onboardingCompleted' in candidate &&
      candidate.onboardingCompleted !== undefined &&
      typeof candidate.onboardingCompleted !== 'boolean') ||
    ('onboardingCompletedAt' in candidate &&
      candidate.onboardingCompletedAt !== null &&
      candidate.onboardingCompletedAt !== undefined &&
      typeof candidate.onboardingCompletedAt !== 'string')
  ) {
    return null;
  }

  return sanitizeStudentProfile({
    name: candidate.name,
    classDesignation: candidate.classDesignation,
    academicYear: candidate.academicYear,
    progress: candidate.progress,
    skillLevel: candidate.skillLevel,
    userRole: normalizeUserRole(candidate.userRole),
    onboardingCompleted: candidate.onboardingCompleted ?? false,
    onboardingCompletedAt: candidate.onboardingCompletedAt ?? null,
  });
}

export function getFirstName(name: string) {
  const firstName = name.trim().split(/\s+/)[0];
  return firstName || 'Learner';
}
