import { TaskEntry, TaskPrediction } from '@/types/productivity';

export class TaskPredictor {
  private readonly MODEL_ENDPOINT = '/api/ml/predict';

  async predictNextTask(
    previousTasks: TaskEntry[]
  ): Promise<TaskPrediction | null> {
    try {
      const features = this.extractFeatures(previousTasks);
      const prediction = await this.callPredictionAPI(features);
      return this.processPrediction(prediction);
    } catch (error) {
      console.error('Prediction error:', error);
      return null;
    }
  }

  private extractFeatures(tasks: TaskEntry[]) {
    return {
      timePatterns: this.analyzeTimePatterns(tasks),
      categorySequence: this.analyzeCategorySequence(tasks),
      energyProfile: this.analyzeEnergyProfile(tasks),
    };
  }

  private analyzeTimePatterns(tasks: TaskEntry[]) {
    return tasks.reduce((acc, task) => ({
      ...acc,
      [task.category]: (acc[task.category] || 0) + task.timeSpent,
    }), {} as Record<string, number>);
  }

  private analyzeCategorySequence(tasks: TaskEntry[]) {
    return tasks
      .slice(-5)
      .map(task => task.category);
  }

  private analyzeEnergyProfile(tasks: TaskEntry[]) {
    return tasks
      .slice(-3)
      .map(task => task.energyLevel);
  }

  private async callPredictionAPI(features: any) {
    const response = await fetch(this.MODEL_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(features),
    });

    if (!response.ok) {
      throw new Error('Prediction API call failed');
    }

    return response.json();
  }

  private processPrediction(rawPrediction: any): TaskPrediction {
    return {
      nextCategory: rawPrediction.category,
      confidence: rawPrediction.confidence,
      suggestedTimeBlock: rawPrediction.timeBlock,
      recommendedEnergyLevel: rawPrediction.energyLevel,
    };
  }
}