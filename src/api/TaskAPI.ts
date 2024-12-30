import {
	Project,
	Task,
	TaskCreateData,
	taskCreateSchema,
	TaskEditData,
	taskEditSchema,
	taskSchema,
} from '@/interfaces';
import { isAxiosError } from 'axios';
import api from '@/lib/axios';

interface TaskProps {
	projectId: Project['_id'];
	formData: TaskCreateData | TaskEditData;
	taskId: Task['_id'];
}

export async function createTask({ projectId, formData }: Pick<TaskProps, 'projectId' | 'formData'>) {
	try {
		const { success, data: taskData } = taskCreateSchema.safeParse(formData);
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

export async function getTask({ projectId, taskId }: Pick<TaskProps, 'projectId' | 'taskId'>) {
	try {
		const { data } = await api.get(`/projects/${projectId}/tasks/${taskId}`);

		const { success, data: task } = taskSchema.safeParse(data);
		if (!success) throw new Error('Error en los datos de salida');

		return task;
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(error.response.data.error);
		}
		if (error instanceof Error) throw error;
		throw new Error('Hubo un error al crear el proyecto');
	}
}

export async function editTask({ projectId, taskId, formData }: TaskProps) {
	try {
		const { success: successData, data: taskData } = taskEditSchema.safeParse(formData);
		if (!successData) throw new Error('Error en los datos de entrada');

		const { data } = await api.put(`/projects/${projectId}/tasks/${taskId}`, taskData);

		const { success: successTask, data: taskUpdated } = taskSchema.safeParse(data);
		if (!successTask) throw new Error('Error en los datos de salida');

		return taskUpdated;
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			throw new Error(error.response.data.error);
		}
		if (error instanceof Error) throw error;
		throw new Error('Hubo un error al crear el proyecto');
	}
}
