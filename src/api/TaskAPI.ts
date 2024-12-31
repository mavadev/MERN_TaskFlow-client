import { Project, Task, TaskDraftData, taskDraftSchema, taskSchema } from '@/interfaces';
import api from '@/lib/axios';
import { responseError } from './errors';

interface TaskProps {
	projectId: Project['_id'];
	formData: TaskDraftData;
	taskId: Task['_id'];
	status: Task['status'];
}

export async function createTask({ projectId, formData }: Pick<TaskProps, 'projectId' | 'formData'>) {
	try {
		const { success, data: taskData } = taskDraftSchema.safeParse(formData);
		if (!success) throw new Error('Error en los datos de entrada');

		const { data: task } = await api.post(`/projects/${projectId}/tasks`, taskData);
		return task;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}

export async function getTask({ projectId, taskId }: Pick<TaskProps, 'projectId' | 'taskId'>) {
	try {
		const { data } = await api.get(`/projects/${projectId}/tasks/${taskId}`);

		const { success, data: task } = taskSchema.safeParse(data);
		if (!success) throw new Error('Error en los datos de salida');

		return task;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}

export async function editTask({ projectId, taskId, formData }: Pick<TaskProps, 'projectId' | 'taskId' | 'formData'>) {
	try {
		const { success: successData, data: taskData } = taskDraftSchema.safeParse(formData);
		if (!successData) throw new Error('Error en los datos de entrada');

		const { data } = await api.put(`/projects/${projectId}/tasks/${taskId}`, taskData);

		const { success: successTask, data: taskUpdated } = taskSchema.safeParse(data);
		if (!successTask) throw new Error('Error en los datos de salida');

		return taskUpdated;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}

export async function deleteTask({ projectId, taskId }: Pick<TaskProps, 'projectId' | 'taskId'>) {
	try {
		const { data } = await api.delete(`/projects/${projectId}/tasks/${taskId}`);
		return data.message;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}

export async function updateStatus({ projectId, taskId, status }: Pick<TaskProps, 'projectId' | 'taskId' | 'status'>) {
	try {
		const { data: task } = await api.patch(`/projects/${projectId}/tasks/${taskId}/status`, { status });
		return task;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}
