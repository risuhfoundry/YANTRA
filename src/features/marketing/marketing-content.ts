import { BookOpen, Globe, Palette, type LucideIcon } from 'lucide-react';

export const marketingAccessDetails = {
  primary: 'AI-native learning operating system',
  audience: 'Built for learners, institutions, and hiring partners',
  status: 'Learner accounts are previewing now, and pilot conversations remain open for partners.',
};

export const marketingNavLinks = [
  { label: 'Platform', href: '#about' },
  { label: 'Capabilities', href: '#academics' },
  { label: 'Use Cases', href: '#campus-life' },
  { label: 'Access', href: '#contact' },
  { label: 'Docs', href: '/docs' },
] as const;

export const marketingTickerItems = [
  'AI SKILL DIAGNOSIS',
  'PERSONALIZED ROADMAPS',
  'CERTIFICATIONS',
  'JOB MATCHING',
] as const;

export type MarketingAcademicCard = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

export const marketingAcademicCards: MarketingAcademicCard[] = [
  {
    icon: BookOpen,
    title: 'AI TUTORING',
    desc: 'Yantra adapts to each learner in real time with guided lessons, feedback loops, and contextual support that keeps momentum high.',
  },
  {
    icon: Globe,
    title: 'ADAPTIVE ROADMAPS',
    desc: 'The platform analyzes skill level, goal, and pace to generate a focused path instead of sending users through generic course clutter.',
  },
  {
    icon: Palette,
    title: 'PROOF & PLACEMENT',
    desc: 'Projects, certifications, and employer-aligned signals stay connected so learning translates into visible progress and job readiness.',
  },
];

export const marketingCampusHighlights = [
  { title: 'Students', gradient: 'from-white/[0.16] via-white/[0.05] to-transparent', height: 'h-64' },
  { title: 'Career Switchers', gradient: 'from-white/[0.14] via-white/[0.04] to-transparent', height: 'h-96' },
  { title: 'Institutions', gradient: 'from-white/[0.12] via-white/[0.03] to-transparent', height: 'h-80' },
  { title: 'Hiring Partners', gradient: 'from-white/[0.18] via-white/[0.05] to-transparent', height: 'h-96' },
  { title: 'Certification Paths', gradient: 'from-white/[0.14] via-white/[0.04] to-transparent', height: 'h-72' },
  { title: 'Job Matching', gradient: 'from-white/[0.1] via-white/[0.03] to-transparent', height: 'h-64' },
] as const;
