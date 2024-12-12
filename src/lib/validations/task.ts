import * as z from 'zod';

export const taskSchema = z.object({
  taskName: z.string()
    .min(3, 'Task name must be at least 3 characters')
    .max(100, 'Task name must not exceed 100 characters'),
  timeSpent: z.number()
    .min(1, 'Time must be at least 1 minute')
    .max(480, 'Time must not exceed 8 hours'),
  energyLevel: z.enum(['Low', 'Medium', 'High']),
  category: z.enum([
    'Development',
    'Communication',
    'Planning',
    'Research',
    'Administrative'
  ]),
  priority: z.enum(['Low', 'Medium', 'High']),
});