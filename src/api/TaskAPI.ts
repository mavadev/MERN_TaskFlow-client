import { Project, responseSchema, Task, TaskDraftData, taskDraftSchema } from '@/interfaces';
import api from '@/lib/axios';
import { responseError } from './errors';

interface TaskProps {
	projectId: Project['_id'];
	formData: TaskDraftData;
	taskId: Task['_id'];
	status: Task['status'];
}

export async function createTask({ projectId, formData }: Pick<TaskProps, 'projectId' | 'formData'>): Promise<string> {
	try {
		const resultData = taskDraftSchema.safeParse(formData);
		if (!resultData.success) throw new Error('Error en los datos de entrada');

		const response = await api.post(`/projects/${projectId}/tasks`, resultData.data);

		const { success, data } = responseSchema.safeParse(response.data);
		if (!success) throw new Error('Error en los datos de salida');

		return data.message;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}

export async function getTask({ projectId, taskId }: Pick<TaskProps, 'projectId' | 'taskId'>): Promise<Task> {
	try {
		const response = await api.get(`/projects/${projectId}/tasks/${taskId}`);

		const { success, data } = responseSchema.safeParse(response.data);
		if (!success) throw new Error('Error en los datos de salida');

		return data.data;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}

export async function editTask({ projectId, taskId, formData }: Pick<TaskProps, 'projectId' | 'taskId' | 'formData'>):Promise<string> {
	try {
		const resultData = taskDraftSchema.safeParse(formData);
		if (!resultData.success) throw new Error('Error en los datos de entrada');

		const response = await api.put(`/projects/${projectId}/tasks/${taskId}`, resultData.data);

		const { success, data } = responseSchema.safeParse(response.data);
		if (!success) throw new Error('Error en los datos de salida');

		return data.message;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}

export async function deleteTask({ projectId, taskId }: Pick<TaskProps, 'projectId' | 'taskId'>):Promise<string> {
	try {
		const response = await api.delete(`/projects/${projectId}/tasks/${taskId}`);

		const { success, data } = responseSchema.safeParse(response.data);
		if (!success) throw new Error('Error en los datos de salida');

		return data.message;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}

export async function updateStatus({ projectId, taskId, status }: Pick<TaskProps, 'projectId' | 'taskId' | 'status'>): Promise<string> {
	try {
		const response = await api.patch(`/projects/${projectId}/tasks/${taskId}/status`, { status });

		const { success, data } = responseSchema.safeParse(response.data);
		if (!success) throw new Error('Error en los datos de salida');

		return data.message;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}
