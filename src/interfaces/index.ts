import { z } from 'zod';

// PROJECTS
export const projectSchema = z.object({
	_id: z.string(),
	projectName: z.string(),
	clientName: z.string(),
	description: z.string(),
});
export interface Project extends z.infer<typeof projectSchema> {}
export interface ProjectFormData extends Pick<Project, 'projectName' | 'clientName' | 'description'> {}
