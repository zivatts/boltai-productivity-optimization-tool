import { z } from 'zod';
import { taskSchema } from '@/lib/validations/task';

export type TaskFormData = z.infer<typeof taskSchema>;