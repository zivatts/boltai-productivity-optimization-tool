import { TaskEntry, Recommendation } from '@/types/productivity';

export const initialTasks: TaskEntry[] = [
  {
    id: 1,
    taskName: 'Email Processing',
    timeSpent: 45,
    completionOrder: 1,
    method: 'Manual Inbox Sorting',
    energyLevel: 'Medium',
    category: 'Communication',
    priority: 'Medium'
  },
  {
    id: 2,
    taskName: 'Project Planning',
    timeSpent: 90,
    completionOrder: 2,
    method: 'Spreadsheet Planning',
    energyLevel: 'High',
    category: 'Planning',
    priority: 'High'
  },
  {
    id: 3,
    taskName: 'Code Review',
    timeSpent: 60,
    completionOrder: 3,
    method: 'Manual Review',
    energyLevel: 'High',
    category: 'Development',
    priority: 'High'
  },
  {
    id: 4,
    taskName: 'Documentation',
    timeSpent: 120,
    completionOrder: 4,
    method: 'Markdown Writing',
    energyLevel: 'Medium',
    category: 'Development',
    priority: 'Medium'
  },
  {
    id: 5,
    taskName: 'Team Meeting',
    timeSpent: 30,
    completionOrder: 5,
    method: 'Virtual Conference',
    energyLevel: 'Medium',
    category: 'Communication',
    priority: 'High'
  },
  {
    id: 6,
    taskName: 'Bug Fixing',
    timeSpent: 75,
    completionOrder: 6,
    method: 'Debug Tools',
    energyLevel: 'High',
    category: 'Development',
    priority: 'High'
  },
  {
    id: 7,
    taskName: 'Research New Technologies',
    timeSpent: 60,
    completionOrder: 7,
    method: 'Web Research',
    energyLevel: 'Medium',
    category: 'Research',
    priority: 'Low'
  },
  {
    id: 8,
    taskName: 'Administrative Tasks',
    timeSpent: 30,
    completionOrder: 8,
    method: 'Manual Processing',
    energyLevel: 'Low',
    category: 'Administrative',
    priority: 'Low'
  }
];

export const initialRecommendations: Recommendation[] = [
  {
    type: 'time',
    description: 'Email processing can be optimized through batch processing and automated filters',
    impact: 'Medium',
    category: 'Communication',
    actionItems: [
      'Set up email filters for automatic categorization',
      'Schedule specific times for email processing',
      'Use email templates for common responses'
    ]
  },
  {
    type: 'method',
    description: 'Implement project management tools for better planning efficiency',
    impact: 'High',
    category: 'Planning',
    actionItems: [
      'Migrate from spreadsheets to dedicated project management software',
      'Set up automated progress tracking',
      'Integrate with existing development tools'
    ]
  },
  {
    type: 'automation',
    description: 'Several administrative tasks can be automated to save time',
    impact: 'Medium',
    category: 'Administrative',
    actionItems: [
      'Implement automated reporting tools',
      'Set up recurring task reminders',
      'Use automation tools for routine processes'
    ]
  },
  {
    type: 'batch',
    description: 'Group similar development tasks for better focus and efficiency',
    impact: 'High',
    category: 'Development',
    actionItems: [
      'Batch code reviews into dedicated sessions',
      'Group related bug fixes',
      'Schedule focused development blocks'
    ]
  }
];