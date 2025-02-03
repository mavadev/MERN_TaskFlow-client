import { z } from 'zod';
import { tasksSchemaSimple } from './task.interface';
import { teamMemberSchema } from './team.interface';

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
	tasks: tasksSchemaSimple,
	manager: teamMemberSchema,
	team: z.array(teamMemberSchema),
	createdAt: z.string(),
});
export interface Project extends z.infer<typeof projectSchema> {}

// Proyecto en estado de borrador
export const projectDraftSchema = projectSchemaSimple.pick({ projectName: true, clientName: true, description: true });
export interface ProjectDraft extends z.infer<typeof projectDraftSchema> {}

// Proyecto en Configuración
export const projectConfigSchema = z.object({
	_id: z.string(),
	projectName: z.string(),
	manager: teamMemberSchema,
	team: z.array(z.string()),
});
export interface ProjectConfig extends z.infer<typeof projectConfigSchema> {}

// Respuesta de proyectos en Configuración
export const projectsResponseConfigSchema = z.object({
	managedProjects: z.array(projectConfigSchema),
	teamProjects: z.array(projectConfigSchema),
});
export interface ProjectsResponseConfig extends z.infer<typeof projectsResponseConfigSchema> {}
