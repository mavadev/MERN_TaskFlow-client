import { z } from 'zod';

const taskStatusSchema = z.enum(['pending', 'onHold', 'inProgress', 'underReview', 'completed']);
export type TaskStatus = z.infer<typeof taskStatusSchema>;

export const taskSchema = z.object({
	_id: z.string(),
	name: z.string(),
	description: z.string(),
	status: taskStatusSchema,
	project: z.string(),
});
export interface Task extends z.infer<typeof taskSchema> {}

export const taskCreateSchema = taskSchema.pick({ name: true, description: true, status: true });
export interface TaskCreate extends z.infer<typeof taskCreateSchema> {}
