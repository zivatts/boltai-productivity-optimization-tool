import { TaskEntry } from '@/types/productivity';
import { SyncStatus } from '@/types/sync';

export class SyncService {
  private readonly SYNC_ENDPOINT = '/api/sync';
  private syncInProgress = false;

  async syncTasks(localTasks: TaskEntry[]): Promise<SyncStatus> {
    if (this.syncInProgress) {
      return { status: 'in_progress' };
    }

    try {
      this.syncInProgress = true;

      const response = await fetch(`${this.SYNC_ENDPOINT}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tasks: localTasks }),
      });

      if (!response.ok) {
        throw new Error('Sync failed');
      }

      const { tasks, timestamp } = await response.json();
      return {
        status: 'success',
        timestamp,
        syncedTasks: tasks,
      };
    } catch (error) {
      console.error('Sync error:', error);
      return {
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    } finally {
      this.syncInProgress = false;
    }
  }

  async getLastSyncTimestamp(): Promise<number> {
    try {
      const response = await fetch(`${this.SYNC_ENDPOINT}/last-sync`);
      if (!response.ok) {
        throw new Error('Failed to get last sync timestamp');
      }

      const { timestamp } = await response.json();
      return timestamp;
    } catch (error) {
      console.error('Get last sync timestamp error:', error);
      return 0;
    }
  }
}