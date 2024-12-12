import { Recommendation, TaskEntry } from '@/types/productivity';

const recommendationTemplates: Recommendation[] = [
  {
    type: 'sequence',
    description: 'Optimize task sequence based on energy levels and priorities',
    impact: 'High',
    category: 'Planning',
    actionItems: [
      'Schedule high-priority tasks during peak energy hours',
      'Group similar tasks together',
      'Plan breaks between high-energy tasks'
    ]
  },
  {
    type: 'automation',
    description: 'Implement automation for repetitive tasks',
    impact: 'High',
    category: 'Development',
    actionItems: [
      'Set up CI/CD pipelines',
      'Create automated testing workflows',
      'Use code generation tools where applicable'
    ]
  },
  {
    type: 'delegation',
    description: 'Consider delegating or outsourcing lower-priority tasks',
    impact: 'Medium',
    category: 'Administrative',
    actionItems: [
      'Identify tasks suitable for delegation',
      'Document processes for handover',
      'Set up monitoring systems'
    ]
  },
  {
    type: 'batch',
    description: 'Implement batch processing for similar tasks',
    impact: 'Medium',
    category: 'Communication',
    actionItems: [
      'Group similar communications',
      'Schedule dedicated time blocks',
      'Use templates and snippets'
    ]
  }
];

export const generateNewRecommendations = (): Recommendation[] => {
  // In a real application, this would analyze the task patterns
  // and generate personalized recommendations
  return recommendationTemplates
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
};