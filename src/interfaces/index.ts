import { z } from 'zod';

// TASKS
export const taskSchema = z.object({
	_id: z.string(),
	name: z.string(),
	description: z.string(),
	status: z.string(),
	project: z.string(),
});
export interface Task extends z.infer<typeof taskSchema> {}

// PROJECTS
export const projectSchema = z.object({
	_id: z.string(),
	projectName: z.string(),
	clientName: z.string(),
	description: z.string(),
	tasks: z.array(taskSchema),
});
export interface Project extends z.infer<typeof projectSchema> {}

export const projectDraftSchema = projectSchema.omit({ _id: true, tasks: true });
export interface ProjectDraftData extends z.infer<typeof projectDraftSchema> {}
