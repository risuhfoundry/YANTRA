export type PythonRoomState = 'current' | 'completed' | 'unlocked' | 'locked' | 'milestone_locked';
export type PythonRoomType = 'Practice' | 'Review' | 'Milestone';

export type PythonSkillRoom = {
  key: string;
  order: number;
  title: string;
  summary: string;
  objective: string;
  practice: string;
  estimatedMinutes: number;
  difficulty: 'Entry' | 'Beginner' | 'Foundational';
  type: PythonRoomType;
  state: PythonRoomState;
  enterHref: string | null;
  prerequisites: string[];
  unlockHint: string;
  rewardLabel: string;
  tags: string[];
};

type PythonSkillTrack = {
  skillKey: string;
  title: string;
  eyebrow: string;
  description: string;
  learnerLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  completionCount: number;
  totalRooms: number;
  masteryProgress: number;
  nextUnlockTitle: string;
  rooms: PythonSkillRoom[];
};

export const pythonSkillTrack: PythonSkillTrack = {
  skillKey: 'python-foundations',
  title: 'Python Foundations',
  eyebrow: 'Skill Rooms Index',
  description:
    'A guided Python path that starts with one live immersive room and keeps future chapters visible so the learner understands what opens next.',
  learnerLevel: 'Beginner',
  completionCount: 0,
  totalRooms: 5,
  masteryProgress: 18,
  nextUnlockTitle: 'Loops and Collections',
  rooms: [
    {
      key: 'control-flow-calibration',
      order: 1,
      title: 'Control Flow Calibration',
      summary: 'The first live Python room. Write one clean pass across learner data and label each result clearly.',
      objective: 'Settle into the Yantra room flow and practice readable control flow with learner-score data.',
      practice: 'Use iteration, conditions, and formatted output to turn raw tuples into readable score labels.',
      estimatedMinutes: 18,
      difficulty: 'Entry',
      type: 'Practice',
      state: 'current',
      enterHref: '/dashboard/rooms/python/control-flow-calibration',
      prerequisites: [],
      unlockHint: 'Live now',
      rewardLabel: 'Live room',
      tags: ['Python', 'logic', 'labels', 'control flow'],
    },
    {
      key: 'variables-and-output',
      order: 2,
      title: 'Variables and Output',
      summary: 'Lock in the basics of assigning values, naming meaningfully, and printing clean program output.',
      objective: 'Make foundational Python syntax feel automatic before the rest of the track opens wider.',
      practice: 'Work with variables, string formatting, and short readable outputs.',
      estimatedMinutes: 12,
      difficulty: 'Entry',
      type: 'Practice',
      state: 'locked',
      enterHref: null,
      prerequisites: ['Complete Control Flow Calibration'],
      unlockHint: 'Unlock by completing Control Flow Calibration',
      rewardLabel: 'Foundation unlock',
      tags: ['variables', 'output', 'syntax'],
    },
    {
      key: 'loops-and-collections',
      order: 3,
      title: 'Loops and Collections',
      summary: 'Move into repeated logic with lists, tuple unpacking, and simple collection traversal.',
      objective: 'Learn how repeated structure turns one-off logic into useful room-scale Python work.',
      practice: 'Iterate through lists and tuples, summarize sequences, and read structured input clearly.',
      estimatedMinutes: 16,
      difficulty: 'Beginner',
      type: 'Practice',
      state: 'locked',
      enterHref: null,
      prerequisites: ['Complete Variables and Output'],
      unlockHint: 'Unlock after Variables and Output',
      rewardLabel: 'Sequence unlock',
      tags: ['loops', 'lists', 'collections'],
    },
    {
      key: 'functions-and-reuse',
      order: 4,
      title: 'Functions and Reuse',
      summary: 'Turn repeated logic into reusable functions with arguments, returns, and cleaner structure.',
      objective: 'Make Python work less repetitive and more intentional before milestone-level challenges open.',
      practice: 'Extract helper functions, pass arguments, and return clear results.',
      estimatedMinutes: 20,
      difficulty: 'Foundational',
      type: 'Review',
      state: 'locked',
      enterHref: null,
      prerequisites: ['Complete Loops and Collections'],
      unlockHint: 'Unlock after Loops and Collections',
      rewardLabel: 'Structure unlock',
      tags: ['functions', 'reuse', 'returns'],
    },
    {
      key: 'learner-scoreboard',
      order: 5,
      title: 'Practice Challenge: Learner Scoreboard',
      summary: 'A milestone room that pulls your first chapters together into one small but complete Python build.',
      objective: 'Apply control flow, variables, loops, and reusable helpers in one joined-up challenge.',
      practice: 'Assemble a small learner score workflow, classify data, and print a final readable board.',
      estimatedMinutes: 25,
      difficulty: 'Foundational',
      type: 'Milestone',
      state: 'milestone_locked',
      enterHref: null,
      prerequisites: ['Complete all prior Python Foundations rooms'],
      unlockHint: 'Milestone room opens after the first four rooms',
      rewardLabel: 'Milestone',
      tags: ['challenge', 'milestone', 'integration'],
    },
  ],
};
