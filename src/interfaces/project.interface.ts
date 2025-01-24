import { z } from 'zod';
import { taskSchema } from './task.interface';

// Proyecto
export const projectSchema = z.object({
	_id: z.string(),
	projectName: z.string(),
	clientName: z.string(),
	description: z.string(),
	tasks: z.array(z.string()),
	team: z.array(z.string()),
});
export const projectsSchema = z.array(projectSchema);
export interface Project extends z.infer<typeof projectSchema> {}

export const projectsResponseSchema = z.object({
	managedProjects: z.array(projectSchema),
	teamProjects: z.array(projectSchema),
});
export interface ProjectsResponse extends z.infer<typeof projectsResponseSchema> {}

// Proyecto con sus tareas
export const projectTasksSchema = z.object({
	_id: z.string(),
	projectName: z.string(),
	clientName: z.string(),
	description: z.string(),
	manager: z.string(),
	tasks: z.array(taskSchema),
});
export interface ProjectTasks extends z.infer<typeof projectTasksSchema> {}

// Proyecto para crear
export const projectCreateSchema = projectSchema.pick({ projectName: true, clientName: true, description: true });
export interface ProjectCreate extends z.infer<typeof projectCreateSchema> {}
