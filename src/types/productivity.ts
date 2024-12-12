export interface TaskEntry {
  id: number;
  taskName: string;
  timeSpent: number;
  completionOrder: number;
  method: string;
  energyLevel: 'Low' | 'Medium' | 'High';
  category?: 'Development' | 'Communication' | 'Planning' | 'Research' | 'Administrative';
  priority?: 'Low' | 'Medium' | 'High';
}

export interface Recommendation {
  type: 'time' | 'method' | 'sequence' | 'energy' | 'batch' | 'automation' | 'delegation';
  description: string;
  impact: 'Low' | 'Medium' | 'High';
  category?: string;
  actionItems?: string[];
}