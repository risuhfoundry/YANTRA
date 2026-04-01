import { getFirstName, type StudentProfile } from './student-profile-model';

export type DashboardSkillIconKey = 'python' | 'logic' | 'ml' | 'data' | 'networks' | 'prompt';
export type DashboardSkillToneKey = 'primary' | 'soft' | 'muted';
export type DashboardRoomTextureKey = 'python-room' | 'neural-builder' | 'data-explorer' | 'prompt-lab';

export type StudentDashboardProfile = StudentProfile & {
  fullName: string;
  firstName: string;
  email: string;
};

export type StudentDashboardPath = {
  pathTitle: string;
  pathDescription: string;
  pathStatusLabel: string;
  pathProgress: number;
  currentFocus: string;
  recommendedActionTitle: string;
  recommendedActionDescription: string;
  recommendedActionPrompt: string;
  learningTrackTitle: string;
  learningTrackDescription: string;
  completionEstimateLabel: string;
  masteryProgress: number;
  masteryUnlockedCount: number;
  masteryTotalCount: number;
  nextSessionDateDay: string;
  nextSessionDateMonth: string;
  nextSessionTitle: string;
  nextSessionDayLabel: string;
  nextSessionTimeLabel: string;
  nextSessionInstructorName: string;
  nextSessionInstructorRole: string;
  nextSessionInstructorImageUrl: string;
  weeklyCompletedSessions: number;
  weeklyChangeLabel: string;
  momentumSummary: string;
  focusSummary: string;
  consistencySummary: string;
};

export type StudentDashboardSkill = {
  skillKey: string;
  title: string;
  description: string;
  levelLabel: string;
  progress: number;
  iconKey: DashboardSkillIconKey;
  toneKey: DashboardSkillToneKey;
  locked: boolean;
  sortOrder: number;
};

export type StudentDashboardCurriculumNode = {
  nodeKey: string;
  moduleLabel: string;
  title: string;
  description: string;
  statusLabel: string;
  unlocked: boolean;
  sortOrder: number;
};

export type StudentDashboardRoom = {
  roomKey: string;
  title: string;
  description: string;
  statusLabel: string;
  ctaLabel: string;
  prompt: string;
  featured: boolean;
  textureKey: DashboardRoomTextureKey;
  sortOrder: number;
};

export type StudentDashboardWeeklyActivity = {
  dayKey: string;
  dayLabel: string;
  containerHeight: number;
  fillHeight: number;
  highlighted: boolean;
  sortOrder: number;
};

export type StudentDashboardSeed = {
  path: StudentDashboardPath;
  skills: StudentDashboardSkill[];
  curriculumNodes: StudentDashboardCurriculumNode[];
  rooms: StudentDashboardRoom[];
  weeklyActivity: StudentDashboardWeeklyActivity[];
};

export type StudentDashboardData = {
  profile: StudentDashboardProfile;
  path: StudentDashboardPath;
  skills: StudentDashboardSkill[];
  curriculumNodes: StudentDashboardCurriculumNode[];
  rooms: StudentDashboardRoom[];
  weeklyActivity: StudentDashboardWeeklyActivity[];
};

export const starterStudentDashboardSeed: StudentDashboardSeed = {
  path: {
    pathTitle: 'AI Foundations',
    pathDescription: 'Moving from logic confidence into visual model understanding.',
    pathStatusLabel: 'Live Path',
    pathProgress: 65,
    currentFocus: 'Neural Networks Basics',
    recommendedActionTitle: 'Enter Neural Net Builder',
    recommendedActionDescription:
      'You are ready to move from abstract ML ideas to a more spatial, visual model-building exercise.',
    recommendedActionPrompt: 'Open my next room and explain what I should focus on there.',
    learningTrackTitle: 'Quantum Physics Basics',
    learningTrackDescription:
      'Your current path is centered on foundational theory, visual intuition, and the discipline needed for deeper model-based thinking.',
    completionEstimateLabel: 'October 14',
    masteryProgress: 33,
    masteryUnlockedCount: 6,
    masteryTotalCount: 18,
    nextSessionDateDay: '09',
    nextSessionDateMonth: 'Sept',
    nextSessionTitle: 'Neural Architectures',
    nextSessionDayLabel: 'Today',
    nextSessionTimeLabel: '14:00 - 15:30',
    nextSessionInstructorName: 'Dr. Helena Vance',
    nextSessionInstructorRole: 'Lead Researcher',
    nextSessionInstructorImageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBpoo9QQe7-grUqAABIO6mxlMzdEsO_CEOFycjE2ZZsky25yoqNgFUZvmlwClwkrK11N0GiwZ3rfxFLzAStZRVnoBYgf82tkZ9-9Jfcpx8jbkoyOcgdEgttvH0sBslgVtju5bmdjnAYxBJmxO_uXcRmX0NZIpJf4kYGCsHuan9NCuRE8axnhcdNOXB6SILcLKWUKThVWPLDr7Qw2Jje_itaNaSUx37l6GZXp60WURy7LSOdR5ydCZwsDos9Y3PVuB4RxhFyQmzZ5XUE',
    weeklyCompletedSessions: 4,
    weeklyChangeLabel: '+12% vs last week',
    momentumSummary: '7-day streak',
    focusSummary: 'Neural nets',
    consistencySummary: '4 sessions',
  },
  skills: [
    {
      skillKey: 'python-basics',
      title: 'Python Basics',
      description: 'Syntax, data structures, and clean logic are now familiar enough to support faster practice.',
      levelLabel: 'Strong',
      progress: 100,
      iconKey: 'python',
      toneKey: 'primary',
      locked: false,
      sortOrder: 1,
    },
    {
      skillKey: 'logic-building',
      title: 'Logic Building',
      description: 'Conditionals, loops, and breakdown thinking are improving through guided challenge walkthroughs.',
      levelLabel: 'In Progress',
      progress: 72,
      iconKey: 'logic',
      toneKey: 'soft',
      locked: false,
      sortOrder: 2,
    },
    {
      skillKey: 'ml-foundations',
      title: 'ML Foundations',
      description: 'You are building intuition for features, models, training, and why data quality matters.',
      levelLabel: 'Started',
      progress: 38,
      iconKey: 'ml',
      toneKey: 'soft',
      locked: false,
      sortOrder: 3,
    },
    {
      skillKey: 'data-handling',
      title: 'Data Handling',
      description: 'Inspecting structure, spotting issues, and narrating patterns is becoming more natural.',
      levelLabel: 'In Progress',
      progress: 51,
      iconKey: 'data',
      toneKey: 'soft',
      locked: false,
      sortOrder: 4,
    },
    {
      skillKey: 'neural-networks',
      title: 'Neural Networks',
      description: 'Locked until the current logic and data milestones are stable enough for visual model building.',
      levelLabel: 'Locked',
      progress: 18,
      iconKey: 'networks',
      toneKey: 'muted',
      locked: true,
      sortOrder: 5,
    },
    {
      skillKey: 'prompt-design',
      title: 'Prompt Design',
      description: 'Unlocks after the next room so you can reason about outputs with stronger technical context.',
      levelLabel: 'Locked',
      progress: 8,
      iconKey: 'prompt',
      toneKey: 'muted',
      locked: true,
      sortOrder: 6,
    },
  ],
  curriculumNodes: [
    {
      nodeKey: 'module-01',
      moduleLabel: 'Module 01',
      title: 'Wave-Particle Duality',
      description: 'Fundamental concepts of light behavior and measurement apparatus.',
      statusLabel: '75% complete',
      unlocked: true,
      sortOrder: 1,
    },
    {
      nodeKey: 'module-02',
      moduleLabel: 'Module 02',
      title: 'Entanglement Theory',
      description: 'Exploring non-local correlations in quantum mechanical systems.',
      statusLabel: 'Locked',
      unlocked: false,
      sortOrder: 2,
    },
    {
      nodeKey: 'module-03',
      moduleLabel: 'Module 03',
      title: 'Hilbert Spaces',
      description: 'Mathematical frameworks for vector spaces in quantum states.',
      statusLabel: 'Locked',
      unlocked: false,
      sortOrder: 3,
    },
  ],
  rooms: [
    {
      roomKey: 'python-room',
      title: 'Python Room',
      description: 'Immersive sandbox for refining logic and data structure implementation with real-time AI guidance.',
      statusLabel: 'Available Now',
      ctaLabel: 'Enter Room',
      prompt: 'Guide me through the Python Room and suggest the right challenge for me.',
      featured: true,
      textureKey: 'python-room',
      sortOrder: 1,
    },
    {
      roomKey: 'neural-net-builder',
      title: 'Neural Net Builder',
      description: 'Visual node editor to construct and train first perceptrons and multi-layer learning flows.',
      statusLabel: 'Recommended Next',
      ctaLabel: 'Start Next Room',
      prompt: 'Open my next room and explain why Neural Net Builder should be next for me.',
      featured: true,
      textureKey: 'neural-builder',
      sortOrder: 2,
    },
    {
      roomKey: 'data-explorer',
      title: 'Data Explorer',
      description: 'Load datasets, inspect patterns, and turn rough signals into understandable stories.',
      statusLabel: 'Open',
      ctaLabel: 'Explore Data',
      prompt: 'Show me what I would learn inside the Data Explorer room.',
      featured: false,
      textureKey: 'data-explorer',
      sortOrder: 3,
    },
    {
      roomKey: 'prompt-lab',
      title: 'Prompt Lab',
      description: 'Experiment with prompts, compare output quality, and understand why instruction design changes results.',
      statusLabel: 'Open',
      ctaLabel: 'Enter Lab',
      prompt: 'Teach me prompt design and open the Prompt Lab context.',
      featured: false,
      textureKey: 'prompt-lab',
      sortOrder: 4,
    },
  ],
  weeklyActivity: [
    { dayKey: 'mon', dayLabel: 'MON', containerHeight: 96, fillHeight: 75, highlighted: false, sortOrder: 1 },
    { dayKey: 'tue', dayLabel: 'TUE', containerHeight: 128, fillHeight: 100, highlighted: true, sortOrder: 2 },
    { dayKey: 'wed', dayLabel: 'WED', containerHeight: 80, fillHeight: 50, highlighted: false, sortOrder: 3 },
    { dayKey: 'thu', dayLabel: 'THU', containerHeight: 144, fillHeight: 100, highlighted: true, sortOrder: 4 },
    { dayKey: 'fri', dayLabel: 'FRI', containerHeight: 112, fillHeight: 25, highlighted: false, sortOrder: 5 },
    { dayKey: 'sat', dayLabel: 'SAT', containerHeight: 48, fillHeight: 0, highlighted: false, sortOrder: 6 },
    { dayKey: 'sun', dayLabel: 'SUN', containerHeight: 48, fillHeight: 0, highlighted: false, sortOrder: 7 },
  ],
};

export function buildStudentDashboardProfile(profile: StudentProfile, email: string): StudentDashboardProfile {
  return {
    ...profile,
    fullName: profile.name,
    firstName: getFirstName(profile.name),
    email,
  };
}

export function buildStarterStudentDashboard(profile: StudentProfile, email: string): StudentDashboardData {
  return {
    profile: buildStudentDashboardProfile(profile, email),
    path: starterStudentDashboardSeed.path,
    skills: starterStudentDashboardSeed.skills,
    curriculumNodes: starterStudentDashboardSeed.curriculumNodes,
    rooms: starterStudentDashboardSeed.rooms,
    weeklyActivity: starterStudentDashboardSeed.weeklyActivity,
  };
}
