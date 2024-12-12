import { TaskEntry, Recommendation } from '@/types/productivity';
import { ProductivityAnalyzer, TaskPattern } from './analyzer';
import { recommendationTemplates } from './templates';

export class RecommendationEngine {
  private analyzer: ProductivityAnalyzer;

  constructor() {
    this.analyzer = new ProductivityAnalyzer();
  }

  async generateRecommendations(tasks: TaskEntry[]): Promise<Recommendation[]> {
    const patterns = this.analyzer.analyzeTaskPatterns(tasks);
    const recommendations = await this.generatePersonalizedRecommendations(patterns);
    return this.prioritizeRecommendations(recommendations);
  }

  private async generatePersonalizedRecommendations(
    patterns: TaskPattern
  ): Promise<Recommendation[]> {
    const recommendations: Recommendation[] = [];

    // Time optimization recommendations
    if (this.hasTimeOptimizationOpportunity(patterns)) {
      recommendations.push(this.generateTimeOptimizationRec(patterns));
    }

    // Energy management recommendations
    if (this.hasEnergyManagementOpportunity(patterns)) {
      recommendations.push(this.generateEnergyManagementRec(patterns));
    }

    // Category-based recommendations
    const categoryRecs = this.generateCategoryBasedRecs(patterns);
    recommendations.push(...categoryRecs);

    return recommendations;
  }

  private hasTimeOptimizationOpportunity(patterns: TaskPattern): boolean {
    // Implement logic to detect time optimization opportunities
    return Object.values(patterns.timeDistribution).some(time => time > 120);
  }

  private hasEnergyManagementOpportunity(patterns: TaskPattern): boolean {
    // Implement logic to detect energy management opportunities
    return patterns.energyPatterns['Low'] > 2;
  }

  private generateTimeOptimizationRec(patterns: TaskPattern): Recommendation {
    // Implement personalized time optimization recommendation logic
    return {
      type: 'time',
      description: 'Optimize time allocation based on task patterns',
      impact: 'High',
      category: 'Planning',
      actionItems: [
        'Batch similar tasks together',
        'Schedule breaks between intensive tasks',
        'Use time-blocking techniques',
      ],
    };
  }

  private generateEnergyManagementRec(patterns: TaskPattern): Recommendation {
    // Implement personalized energy management recommendation logic
    return {
      type: 'energy',
      description: 'Optimize task scheduling based on energy levels',
      impact: 'High',
      category: 'Planning',
      actionItems: [
        'Schedule high-priority tasks during peak energy hours',
        'Group low-energy tasks together',
        'Take strategic breaks to maintain energy levels',
      ],
    };
  }

  private generateCategoryBasedRecs(patterns: TaskPattern): Recommendation[] {
    // Implement category-specific recommendation logic
    return Object.entries(patterns.categoryBreakdown)
      .map(([category, count]) => {
        const template = recommendationTemplates
          .find(t => t.category === category);
        return template ? { ...template } : null;
      })
      .filter((rec): rec is Recommendation => rec !== null);
  }

  private prioritizeRecommendations(
    recommendations: Recommendation[]
  ): Recommendation[] {
    return recommendations
      .sort((a, b) => {
        const impactScore = { High: 3, Medium: 2, Low: 1 };
        return impactScore[b.impact] - impactScore[a.impact];
      })
      .slice(0, 4);
  }
}