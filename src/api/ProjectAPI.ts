import api from '@/lib/axios';
import { responseError } from './errors';
import { ResponseData } from '@/interfaces/api.interface';
import {
	projectsSchema,
	Project,
	projectTasksSchema,
	ProjectTasks,
	ProjectCreate,
} from '@/interfaces/project.interface';

interface ProjectProps {
	projectId: Project['_id'];
	formData: ProjectCreate;
}

export async function getProjects(): Promise<Project[]> {
	try {
		const { data } = await api.get<ResponseData>('/projects');

		const { success, data: projects } = projectsSchema.safeParse(data);
		if (!success) throw new Error('Error al obtener los proyectos');

		return projects;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}

export async function getProject({ projectId }: Pick<ProjectProps, 'projectId'>): Promise<ProjectTasks> {
	try {
		const { data } = await api.get<ResponseData>(`/projects/${projectId}`);

		const { success, data: project } = projectTasksSchema.safeParse(data);
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
