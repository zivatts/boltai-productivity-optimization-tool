import React, { useState } from 'react';
import { TaskEntry } from '@/types/productivity';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { TaskForm } from './TaskInput/TaskForm';
import { TaskFormData } from '@/types/forms';

interface TaskTableProps {
  tasks: TaskEntry[];
  onEditTask: (id: number, data: TaskFormData) => void;
  onDeleteTask: (id: number) => void;
}

export const TaskTable: React.FC<TaskTableProps> = ({ 
  tasks, 
  onEditTask, 
  onDeleteTask 
}) => {
  const [editingTask, setEditingTask] = useState<TaskEntry | null>(null);
  const [deletingTaskId, setDeletingTaskId] = useState<number | null>(null);

  const getEnergyColor = (level: string) => {
    switch (level) {
      case 'High': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleEdit = (task: TaskEntry) => {
    setEditingTask(task);
  };

  const handleEditSubmit = (data: TaskFormData) => {
    if (editingTask) {
      onEditTask(editingTask.id, data);
      setEditingTask(null);
    }
  };

  const handleDelete = (id: number) => {
    setDeletingTaskId(id);
  };

  const confirmDelete = () => {
    if (deletingTaskId !== null) {
      onDeleteTask(deletingTaskId);
      setDeletingTaskId(null);
    }
  };

  return (
    <>
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden shadow-sm sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                  <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Category</th>
                  <th scope="col" className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th scope="col" className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                  <th scope="col" className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Energy</th>
                  <th scope="col" className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50">
                    <td className="px-3 py-2 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{task.taskName}</div>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap hidden lg:table-cell">
                      <Badge variant="secondary" className="text-xs">{task.category}</Badge>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-right text-sm">
                      {task.timeSpent}m
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(task.priority || '')}`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getEnergyColor(task.energyLevel)}`}>
                        {task.energyLevel}
                      </span>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-right space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(task)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(task.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Dialog open={!!editingTask} onOpenChange={() => setEditingTask(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          {editingTask && (
            <TaskForm
              onSubmit={handleEditSubmit}
              initialData={{
                taskName: editingTask.taskName,
                timeSpent: editingTask.timeSpent,
                energyLevel: editingTask.energyLevel,
                category: editingTask.category || 'Development',
                priority: editingTask.priority || 'Medium',
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deletingTaskId} onOpenChange={() => setDeletingTaskId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the task.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};