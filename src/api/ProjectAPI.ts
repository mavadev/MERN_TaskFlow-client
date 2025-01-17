import api from '@/lib/axios';
import { projectDraftSchema, ProjectDraftData, ProjectTasks, Project, responseSchema } from '@/interfaces/app';
import { responseError } from './errors';

interface ProjectProps {
	projectId: Project['_id'];
	formData: ProjectDraftData;
}

export async function createProject({ formData }: Pick<ProjectProps, 'formData'>): Promise<string> {
	try {
		// Validación de datos
		const dataResult = projectDraftSchema.safeParse(formData);
		if (!dataResult.success) throw new Error('Error en los datos de entrada');

		// Petición a la API
		const response = await api.post('/projects', formData);

		// Validación de respuesta
		const { success, data } = responseSchema.safeParse(response.data);
		if (!success) throw new Error('Error en los datos de respuesta');

		return data.message;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}

export async function getProjects(): Promise<Project[]> {
	try {
		const response = await api.get('/projects');

		const { success, data } = responseSchema.safeParse(response.data);
		if (!success) throw new Error('Error en los datos de respuesta');

		return data.data;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}

export async function getProject({ projectId }: Pick<ProjectProps, 'projectId'>): Promise<ProjectTasks> {
	try {
		const response = await api.get(`/projects/${projectId}`);

		const { success, data } = responseSchema.safeParse(response.data);
		if (!success) throw new Error('Error en los datos de respuesta');

		return data.data;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}

export async function updateProject({ projectId, formData }: ProjectProps): Promise<string> {
	try {
		const dataResult = projectDraftSchema.safeParse(formData);
		if (!dataResult.success) throw new Error('Error en los datos de entrada');

		const response = await api.put(`/projects/${projectId}`, dataResult.data);

		const { success, data } = responseSchema.safeParse(response.data);
		if (!success) throw new Error('Error en los datos de respuesta');

		return data.message;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}

export async function deleteProject({ projectId }: Pick<ProjectProps, 'projectId'>): Promise<string> {
	try {
		const response = await api.delete(`/projects/${projectId}`);

		const { success, data } = responseSchema.safeParse(response.data);
		if (!success) throw new Error('Error en los datos de respuesta');

		return data.message;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}
