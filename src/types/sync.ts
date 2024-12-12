import { TaskEntry } from './productivity';

export type SyncStatus = {
  status: 'success' | 'error' | 'in_progress';
  timestamp?: number;
  syncedTasks?: TaskEntry[];
  error?: string;
};