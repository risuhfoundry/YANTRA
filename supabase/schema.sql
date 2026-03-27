create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  full_name text not null,
  class_designation text not null default 'Class 10',
  skill_level text not null default 'Beginner' check (skill_level in ('Beginner', 'Intermediate', 'Advanced')),
  progress integer not null default 0 check (progress >= 0 and progress <= 100),
  academic_year text not null default to_char(now(), 'YYYY'),
  user_role text,
  onboarding_completed boolean not null default false,
  onboarding_completed_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.profiles
  add column if not exists user_role text,
  add column if not exists onboarding_completed boolean default false,
  add column if not exists onboarding_completed_at timestamptz;

update public.profiles
set onboarding_completed = coalesce(onboarding_completed, false);

alter table public.profiles
  alter column onboarding_completed set default false,
  alter column onboarding_completed set not null;

alter table public.profiles drop constraint if exists profiles_user_role_check;

alter table public.profiles
  add constraint profiles_user_role_check
  check (
    user_role is null
    or user_role in (
      'School Student (12-18)',
      'College Student (18-25)',
      'Self-Learner (Any Age)',
      'Teacher / Educator',
      'Institution / School',
      'Hiring Company'
    )
  );

create or replace function public.set_profiles_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists set_profiles_updated_at on public.profiles;

create trigger set_profiles_updated_at
before update on public.profiles
for each row
execute function public.set_profiles_updated_at();

alter table public.profiles enable row level security;

drop policy if exists "Users can view their own profile" on public.profiles;
create policy "Users can view their own profile"
on public.profiles
for select
to authenticated
using ((select auth.uid()) = id);

drop policy if exists "Users can insert their own profile" on public.profiles;
create policy "Users can insert their own profile"
on public.profiles
for insert
to authenticated
with check ((select auth.uid()) = id);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
on public.profiles
for update
to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);
