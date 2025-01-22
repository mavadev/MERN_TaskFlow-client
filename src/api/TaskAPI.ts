import api from '@/lib/axios';
import { responseError } from './errors';
import type { Project } from '@/interfaces/project.interface';
import type { ResponseData } from '@/interfaces/api.interface';
import { Task, TaskCreate, taskSchema } from '@/interfaces/task.interface';

interface TaskProps {
	projectId: Project['_id'];
	formData: TaskCreate;
	taskId: Task['_id'];
	status: Task['status'];
}

export async function getTask({ projectId, taskId }: Pick<TaskProps, 'projectId' | 'taskId'>): Promise<Task> {
	try {
		const response = await api.get<ResponseData>(`/projects/${projectId}/tasks/${taskId}`);

		const { success, data: task } = taskSchema.safeParse(response.data);
		if (!success) throw new Error('Error al obtener la tarea');

		return task;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}

export async function createTask({ projectId, formData }: Pick<TaskProps, 'projectId' | 'formData'>) {
	try {
		const { data } = await api.post<ResponseData>(`/projects/${projectId}/tasks`, formData);
		return data.message;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}
export async function editTask({ projectId, taskId, formData }: Pick<TaskProps, 'projectId' | 'taskId' | 'formData'>) {
	try {
		const { data } = await api.put(`/projects/${projectId}/tasks/${taskId}`, formData);
		return data.message;
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
		const { data } = await api.patch(`/projects/${projectId}/tasks/${taskId}/status`, { status });
		return data.message;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}
