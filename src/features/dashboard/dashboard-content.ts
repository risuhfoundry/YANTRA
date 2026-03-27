import type { LucideIcon } from 'lucide-react';

export type DashboardSkillCard = {
  title: string;
  description: string;
  level: string;
  progress: number;
  icon: LucideIcon;
  tone: string;
  locked?: boolean;
};

export type DashboardRoomCard = {
  title: string;
  description: string;
  status: string;
  cta: string;
  prompt: string;
  featured: boolean;
  texture: string;
};

export type DashboardMomentumBar = {
  day: string;
  containerHeight: number;
  fillHeight: number;
  bright?: boolean;
};

export type DashboardCurriculumNode = {
  module: string;
  title: string;
  description: string;
  status: string;
  unlocked: boolean;
};

export const dashboardSectionLinks = [
  { label: 'Overview', href: '#overview' },
  { label: 'Skills', href: '#skills' },
  { label: 'Rooms', href: '#rooms' },
  { label: 'Yantra AI', href: '#yantra-ai' },
] as const;
