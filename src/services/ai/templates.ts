import { Recommendation } from '@/types/productivity';

export const recommendationTemplates: Recommendation[] = [
  {
    type: 'automation',
    description: 'Implement automation for repetitive development tasks',
    impact: 'High',
    category: 'Development',
    actionItems: [
      'Set up CI/CD pipelines',
      'Automate testing processes',
      'Create code generation templates',
    ],
  },
  {
    type: 'batch',
    description: 'Optimize communication workflow through batching',
    impact: 'Medium',
    category: 'Communication',
    actionItems: [
      'Schedule dedicated email time blocks',
      'Use communication templates',
      'Set up automated responses',
    ],
  },
  // Add more templates for each category
];