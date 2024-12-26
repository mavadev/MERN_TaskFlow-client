import api from '@/lib/axios';
import { isAxiosError } from 'axios';
import { projectDraftSchema, ProjectDraftData, Project, projectSchema } from '@/interfaces';

export async function createProject(formData: ProjectDraftData): Promise<Project> {
	try {
		// Validación de datos
		const dataResult = projectDraftSchema.safeParse(formData);
		if (!dataResult.success) throw new Error('Error en los datos de entrada');

		// Petición a la API
		const { data } = await api.post('/projects', formData);

		// Validación de respuesta
		const result = projectSchema.safeParse(data);
		if (!result.success) throw new Error('Error en los datos de respuesta');

		return data;
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(error.response.data.message || error.response.data.error);
		}
		if (error instanceof Error) throw error;
		throw new Error('Hubo un error al crear el proyecto');
	}
}
