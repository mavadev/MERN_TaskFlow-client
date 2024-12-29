import api from '@/lib/axios';
import { isAxiosError } from 'axios';
import {
	projectDraftSchema,
	ProjectDraftData,
	ProjectTasks,
	projectTasksSchema,
	projectsSchema,
	Project,
} from '@/interfaces';

interface ProjectProps {
	projectId: Project['_id'];
	formData: ProjectDraftData;
}

export async function createProject(formData: Pick<ProjectProps, 'formData'>): Promise<ProjectTasks> {
	try {
		// Validación de datos
		const dataResult = projectDraftSchema.safeParse(formData);
		if (!dataResult.success) throw new Error('Error en los datos de entrada');

		// Petición a la API
		const { data } = await api.post('/projects', formData);

		// Validación de respuesta
		const result = projectTasksSchema.safeParse(data);
		if (!result.success) throw new Error('Error en los datos de respuesta');

		return data;
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(error.response.data.error);
		}
		if (error instanceof Error) throw error;
		throw new Error('Hubo un error al crear el proyecto');
	}
}

export async function getProjects(): Promise<Project[]> {
	try {
		const { data } = await api.get('/projects');

		const result = projectsSchema.safeParse(data);
		if (!result.success) throw new Error('Error en los datos de respuesta');

		return data;
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(error.response.data.error);
		}
		if (error instanceof Error) throw error;
		throw new Error('Hubo un error al crear el proyecto');
	}
}

export async function getProject(projectId: Pick<ProjectProps, 'projectId'>): Promise<Project> {
	try {
		const { data } = await api.get(`/projects/${projectId}`);

		const result = projectTasksSchema.safeParse(data);
		if (!result.success) throw new Error('Error en los datos de respuesta');

		return data;
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(error.response.data.error);
		}
		if (error instanceof Error) throw error;
		throw new Error('Hubo un error al crear el proyecto');
	}
}

export async function updateProject({ projectId, formData }: ProjectProps) {
	try {
		// Validación de datos
		const dataResult = projectDraftSchema.safeParse(formData);
		if (!dataResult.success) throw new Error('Error en los datos de entrada');

		const { data } = await api.put(`/projects/${projectId}`, dataResult.data);
		return data;
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(error.response.data.error);
		}
		if (error instanceof Error) throw error;
		throw new Error('Hubo un error al crear el proyecto');
	}
}

export async function deleteProject(projectId: Pick<ProjectProps, 'projectId'>) {
	try {
		await api.delete(`/projects/${projectId}`);
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(error.response.data.error);
		}
		throw new Error('Hubo un error al crear el proyecto');
	}
}
