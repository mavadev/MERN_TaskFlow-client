import { Project, TaskDraftData, taskDraftSchema } from '@/interfaces';
import { isAxiosError } from 'axios';
import api from '@/lib/axios';

interface TaskProps {
	projectId: Project['_id'];
	formData: TaskDraftData;
}

export async function createTask({ projectId, formData }: TaskProps) {
	try {
		const { success, data: taskData } = taskDraftSchema.safeParse(formData);
		if (!success) throw new Error('Error en los datos de entrada');

		const { data: task } = await api.post(`/projects/${projectId}/tasks`, taskData);
		return task;
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(error.response.data.error);
		}
		if (error instanceof Error) throw error;
		throw new Error('Hubo un error al crear el proyecto');
	}
}
