import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { taskSchema } from '@/lib/validations/task';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { TaskFormData } from '@/types/forms';
import { TaskFormFields } from './TaskFormFields';

interface TaskFormProps {
  onSubmit: (data: TaskFormData) => void;
  isLoading?: boolean;
  initialData?: TaskFormData;
}

export function TaskForm({ onSubmit, isLoading, initialData }: TaskFormProps) {
  const form = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: initialData || {
      taskName: '',
      timeSpent: 0,
      energyLevel: 'Medium',
      category: 'Development',
      priority: 'Medium',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <TaskFormFields form={form} />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : initialData ? 'Update Task' : 'Add Task'}
        </Button>
      </form>
    </Form>
  );
}