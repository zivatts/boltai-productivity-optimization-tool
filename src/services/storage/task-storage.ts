import { TaskEntry } from '@/types/productivity';

export class TaskStorage {
  private storageKey = 'productivity_tasks';

  async saveTasks(tasks: TaskEntry[]): Promise<void> {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks:', error);
      throw new Error('Failed to save tasks');
    }
  }

  async loadTasks(): Promise<TaskEntry[]> {
    try {
      const tasksJson = localStorage.getItem(this.storageKey);
      return tasksJson ? JSON.parse(tasksJson) : [];
    } catch (error) {
      console.error('Error loading tasks:', error);
      throw new Error('Failed to load tasks');
    }
  }
}