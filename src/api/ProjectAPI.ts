import api from '@/lib/axios';
import { responseError } from './errors';
import { ResponseData } from '@/interfaces/api.interface';
import {
	projectsResponseSchema,
	ProjectsResponse,
	projectSchema,
	Project,
	ProjectDraft,
	ProjectsResponseConfig,
	projectsResponseConfigSchema,
} from '@/interfaces/project.interface';

interface ProjectProps {
	projectId: Project['_id'];
	formData: ProjectDraft;
}

export async function getProjects(): Promise<ProjectsResponse> {
	try {
		const { data } = await api.get<ResponseData>('/projects');

		const { success, data: projects } = projectsResponseSchema.safeParse(data.data);
		if (!success) throw new Error('Error al obtener los proyectos');

		return projects;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}

export async function getProject({ projectId }: Pick<ProjectProps, 'projectId'>): Promise<Project> {
	try {
		const { data } = await api.get<ResponseData>(`/projects/${projectId}`);

		const { success, data: project } = projectSchema.safeParse(data.data);
		if (!success) throw new Error('Error al obtener el proyecto');

		return project;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}

export async function createProject({ formData }: Pick<ProjectProps, 'formData'>) {
	try {
		const { data } = await api.post('/projects', formData);
		return data.message;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}

export async function updateProject({ projectId, formData }: ProjectProps) {
	try {
		const { data } = await api.put(`/projects/${projectId}`, formData);
		return data.message;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}

export async function deleteProject({ projectId }: Pick<ProjectProps, 'projectId'>) {
	try {
		const { data } = await api.delete(`/projects/${projectId}`);
		return data.message;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}

export async function getProjectsConfig(): Promise<ProjectsResponseConfig> {
	try {
		const { data } = await api.get<ResponseData>('/projects/config');

		const { success, data: projects } = projectsResponseConfigSchema.safeParse(data.data);
		if (!success) throw new Error('Error al obtener los proyectos');

		return projects;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}
