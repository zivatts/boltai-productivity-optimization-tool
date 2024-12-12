import { useState, useCallback } from 'react';
import { TaskEntry, Recommendation } from '@/types/productivity';
import { RecommendationEngine } from '@/services/ai/recommendation-engine';
import { TaskStorage } from '@/services/storage/task-storage';

export function useProductivityEngine() {
  const [tasks, setTasks] = useState<TaskEntry[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const engine = new RecommendationEngine();
  const storage = new TaskStorage();

  const loadTasks = useCallback(async () => {
    try {
      const loadedTasks = await storage.loadTasks();
      setTasks(loadedTasks);
      return loadedTasks;
    } catch (error) {
      console.error('Error loading tasks:', error);
      return [];
    }
  }, []);

  const addTask = useCallback(async (task: Omit<TaskEntry, 'id'>) => {
    const newTask: TaskEntry = {
      ...task,
      id: Date.now(),
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    await storage.saveTasks(updatedTasks);
    return newTask;
  }, [tasks]);

  const generateRecommendations = useCallback(async () => {
    setIsLoading(true);
    try {
      const newRecommendations = await engine.generateRecommendations(tasks);
      setRecommendations(newRecommendations);
    } catch (error) {
      console.error('Error generating recommendations:', error);
    } finally {
      setIsLoading(false);
    }
  }, [tasks]);

  return {
    tasks,
    recommendations,
    isLoading,
    loadTasks,
    addTask,
    generateRecommendations,
  };
}