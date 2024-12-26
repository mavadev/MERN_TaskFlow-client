import { projectDraftSchema, ProjectDraftData, Project, projectSchema } from '@/interfaces';
import api from '@/lib/axios';

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
		if (error instanceof Error) throw error;
		throw new Error('Hubo un error al crear el proyecto');
	}
}
