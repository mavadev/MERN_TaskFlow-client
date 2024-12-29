import { z } from 'zod';

// TASKS
const taskStatusSchema = z.enum(['pending', 'onHold', 'inProgress', 'underReview', 'completed']);
export const taskSchema = z.object({
	_id: z.string(),
	name: z.string(),
	description: z.string(),
	status: taskStatusSchema,
	project: z.string(),
});
export interface Task extends z.infer<typeof taskSchema> {}

export const taskDraftSchema = taskSchema.pick({ name: true, description: true });
export interface TaskDraftData extends z.infer<typeof taskDraftSchema> {}

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

export const projectDraftSchema = projectSchema.pick({ projectName: true, clientName: true, description: true });
export interface ProjectDraftData extends z.infer<typeof projectDraftSchema> {}
