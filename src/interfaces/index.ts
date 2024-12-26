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
export const projectTasksSchema = z.object({
	_id: z.string(),
	projectName: z.string(),
	clientName: z.string(),
	description: z.string(),
	tasks: z.array(taskSchema),
});
export interface ProjectTasks extends z.infer<typeof projectTasksSchema> {}

export const projectSchema = z.object({
	_id: z.string(),
	projectName: z.string(),
	clientName: z.string(),
	description: z.string(),
	tasks: z.array(z.string()),
});
export const projectsSchema = z.array(projectSchema);
export interface Project extends z.infer<typeof projectSchema> {}

export const projectDraftSchema = projectSchema.omit({ _id: true, tasks: true });
export interface ProjectDraftData extends z.infer<typeof projectDraftSchema> {}
