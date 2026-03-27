import type { User } from '@supabase/supabase-js';
import {
  defaultStudentProfile,
  normalizeUserRole,
  sanitizeStudentProfile,
  type StudentProfile,
} from '@/src/features/dashboard/student-profile-model';
import { createClient } from './server';

type ProfileRow = {
  id: string;
  email: string | null;
  full_name: string | null;
  class_designation: string | null;
  skill_level: StudentProfile['skillLevel'] | null;
  progress: number | null;
  academic_year: string | null;
  user_role: string | null;
  onboarding_completed: boolean | null;
  onboarding_completed_at: string | null;
  created_at?: string | null;
  updated_at?: string | null;
};

type LegacyProfileRow = Omit<ProfileRow, 'user_role' | 'onboarding_completed' | 'onboarding_completed_at'>;

function deriveFullName(user: User) {
  const metadataName =
    typeof user.user_metadata?.full_name === 'string'
      ? user.user_metadata.full_name
      : typeof user.user_metadata?.name === 'string'
        ? user.user_metadata.name
        : null;

  if (metadataName?.trim()) {
    return metadataName.trim();
  }

  if (user.email) {
    return user.email.split('@')[0].replace(/[._-]+/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
  }

  return defaultStudentProfile.name;
}

export function buildDefaultStudentProfile(user: User): StudentProfile {
  return sanitizeStudentProfile({
    ...defaultStudentProfile,
    name: deriveFullName(user),
    academicYear: new Date().getFullYear().toString(),
  });
}

function buildDefaultStudentProfileForUserContext(user: User, profile: StudentProfile) {
  const defaultProfile = buildDefaultStudentProfile(user);

  return sanitizeStudentProfile({
    ...defaultProfile,
    userRole: profile.userRole,
    onboardingCompleted: profile.onboardingCompleted,
    onboardingCompletedAt: profile.onboardingCompletedAt,
  });
}

function mapProfileRowToStudentProfile(row: ProfileRow | null, user: User) {
  const seededProfile = buildDefaultStudentProfile(user);

  if (!row) {
    return seededProfile;
  }

  return sanitizeStudentProfile({
    name: row.full_name || seededProfile.name,
    classDesignation: row.class_designation || seededProfile.classDesignation,
    skillLevel: row.skill_level || seededProfile.skillLevel,
    progress: typeof row.progress === 'number' ? row.progress : seededProfile.progress,
    academicYear: row.academic_year || seededProfile.academicYear,
    userRole: normalizeUserRole(row.user_role),
    onboardingCompleted: Boolean(row.onboarding_completed),
    onboardingCompletedAt: row.onboarding_completed_at,
  });
}

function mapStudentProfileToRow(user: User, profile: StudentProfile): Omit<ProfileRow, 'created_at' | 'updated_at'> {
  const safeProfile = sanitizeStudentProfile(profile);

  return {
    id: user.id,
    email: user.email ?? null,
    full_name: safeProfile.name,
    class_designation: safeProfile.classDesignation,
    skill_level: safeProfile.skillLevel,
    progress: safeProfile.progress,
    academic_year: safeProfile.academicYear,
    user_role: safeProfile.userRole,
    onboarding_completed: safeProfile.onboardingCompleted,
    onboarding_completed_at: safeProfile.onboardingCompletedAt,
  };
}

function mapStudentProfileToLegacyRow(
  user: User,
  profile: StudentProfile,
): Omit<LegacyProfileRow, 'created_at' | 'updated_at'> {
  const safeProfile = sanitizeStudentProfile(profile);

  return {
    id: user.id,
    email: user.email ?? null,
    full_name: safeProfile.name,
    class_designation: safeProfile.classDesignation,
    skill_level: safeProfile.skillLevel,
    progress: safeProfile.progress,
    academic_year: safeProfile.academicYear,
  };
}

function isMissingSessionError(error: unknown) {
  if (!(error instanceof Error)) {
    return false;
  }

  return error.name === 'AuthSessionMissingError' || error.message.toLowerCase().includes('auth session missing');
}

function isSupabaseSchemaError(
  error: unknown,
  column: 'user_role' | 'onboarding_completed' | 'onboarding_completed_at',
) {
  if (!error || typeof error !== 'object') {
    return false;
  }

  const candidate = error as { code?: unknown; message?: unknown };

  return (
    (candidate.code === 'PGRST204' || candidate.code === '42703') &&
    typeof candidate.message === 'string' &&
    (candidate.message.includes(`'${column}' column`) ||
      candidate.message.includes(`profiles.${column}`) ||
      candidate.message.includes(column))
  );
}

function isMissingOnboardingSchemaError(error: unknown) {
  return (
    isSupabaseSchemaError(error, 'user_role') ||
    isSupabaseSchemaError(error, 'onboarding_completed') ||
    isSupabaseSchemaError(error, 'onboarding_completed_at')
  );
}

async function supportsOnboardingProfileSchema(supabase: Awaited<ReturnType<typeof createClient>>) {
  const { error } = await supabase.from('profiles').select('onboarding_completed').limit(1);

  if (!error) {
    return true;
  }

  if (isMissingOnboardingSchemaError(error)) {
    return false;
  }

  throw error;
}

export async function getAuthenticatedUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    if (isMissingSessionError(error)) {
      return null;
    }

    throw error;
  }

  return user;
}

export async function getAuthenticatedProfile() {
  const user = await getAuthenticatedUser();

  if (!user) {
    return null;
  }

  const supabase = await createClient();
  const defaultProfile = buildDefaultStudentProfile(user);
  const supportsOnboardingSchema = await supportsOnboardingProfileSchema(supabase);

  const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).maybeSingle();

  if (error) {
    throw error;
  }

  const existingProfile = (data as ProfileRow | null) ?? null;

  if (!existingProfile) {
    const { data: insertedData, error: insertError } = supportsOnboardingSchema
      ? await supabase.from('profiles').insert(mapStudentProfileToRow(user, defaultProfile)).select('*').single()
      : await supabase.from('profiles').insert(mapStudentProfileToLegacyRow(user, defaultProfile)).select('*').single();

    if (insertError) {
      throw insertError;
    }

    const insertedProfile = mapProfileRowToStudentProfile(insertedData as ProfileRow, user);

    return {
      user,
      profile: insertedProfile,
      defaultProfile: buildDefaultStudentProfileForUserContext(user, insertedProfile),
      supportsOnboardingSchema,
    };
  }

  const mappedProfile = mapProfileRowToStudentProfile(existingProfile, user);

  return {
    user,
    profile: mappedProfile,
    defaultProfile: buildDefaultStudentProfileForUserContext(user, mappedProfile),
    supportsOnboardingSchema,
  };
}

export async function updateAuthenticatedProfile(profile: StudentProfile) {
  const user = await getAuthenticatedUser();

  if (!user) {
    return null;
  }

  const supabase = await createClient();
  const supportsOnboardingSchema = await supportsOnboardingProfileSchema(supabase);
  const { data, error } = supportsOnboardingSchema
    ? await supabase.from('profiles').upsert(mapStudentProfileToRow(user, profile), { onConflict: 'id' }).select('*').single()
    : await supabase
        .from('profiles')
        .upsert(mapStudentProfileToLegacyRow(user, profile), { onConflict: 'id' })
        .select('*')
        .single();

  if (error) {
      throw error;
  }

  return {
    user,
    profile: mapProfileRowToStudentProfile(data as ProfileRow, user),
    defaultProfile: buildDefaultStudentProfileForUserContext(
      user,
      mapProfileRowToStudentProfile(data as ProfileRow, user),
    ),
    supportsOnboardingSchema,
  };
}
