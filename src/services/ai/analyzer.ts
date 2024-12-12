import { TaskEntry, Recommendation } from '@/types/productivity';

export interface TaskPattern {
  timeDistribution: Record<string, number>;
  energyPatterns: Record<string, number>;
  categoryBreakdown: Record<string, number>;
  commonSequences: string[];
}

export class ProductivityAnalyzer {
  analyzeTaskPatterns(tasks: TaskEntry[]): TaskPattern {
    return {
      timeDistribution: this.analyzeTimeDistribution(tasks),
      energyPatterns: this.analyzeEnergyPatterns(tasks),
      categoryBreakdown: this.analyzeCategoryBreakdown(tasks),
      commonSequences: this.findCommonSequences(tasks),
    };
  }

  private analyzeTimeDistribution(tasks: TaskEntry[]): Record<string, number> {
    const distribution: Record<string, number> = {};
    tasks.forEach(task => {
      distribution[task.category || 'Uncategorized'] = 
        (distribution[task.category || 'Uncategorized'] || 0) + task.timeSpent;
    });
    return distribution;
  }

  private analyzeEnergyPatterns(tasks: TaskEntry[]): Record<string, number> {
    const patterns: Record<string, number> = {};
    tasks.forEach(task => {
      patterns[task.energyLevel] = (patterns[task.energyLevel] || 0) + 1;
    });
    return patterns;
  }

  private analyzeCategoryBreakdown(tasks: TaskEntry[]): Record<string, number> {
    const breakdown: Record<string, number> = {};
    tasks.forEach(task => {
      breakdown[task.category || 'Uncategorized'] = 
        (breakdown[task.category || 'Uncategorized'] || 0) + 1;
    });
    return breakdown;
  }

  private findCommonSequences(tasks: TaskEntry[]): string[] {
    // Implement sequence pattern detection logic
    return tasks
      .map(task => task.category)
      .filter((category): category is string => !!category);
  }
}