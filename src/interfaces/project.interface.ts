import { z } from 'zod';
import { tasksSchemaSimple } from './task.interface';

// Proyecto Simple ( Listado de proyectos )
export const projectSchemaSimple = z.object({
	_id: z.string(),
	clientName: z.string(),
	projectName: z.string(),
	description: z.string(),
	team: z.array(z.string()),
});
export const projectsSchema = z.array(projectSchemaSimple);
export interface ProjectSimple extends z.infer<typeof projectSchemaSimple> {}

// Respuesta de proyectos
export const projectsResponseSchema = z.object({
	managedProjects: z.array(projectSchemaSimple),
	teamProjects: z.array(projectSchemaSimple),
});
export interface ProjectsResponse extends z.infer<typeof projectsResponseSchema> {}

// Proyecto Completo
export const projectSchema = projectSchemaSimple.extend({
	manager: z.string(),
	tasks: tasksSchemaSimple,
	createdAt: z.string(),
});
export interface Project extends z.infer<typeof projectSchema> {}

// Proyecto en estado de borrador
export const projectDraftSchema = projectSchemaSimple.pick({ projectName: true, clientName: true, description: true });
export interface ProjectDraft extends z.infer<typeof projectDraftSchema> {}
