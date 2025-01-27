import api from '@/lib/axios';
import { responseError } from './errors';
import type { ResponseData } from '@/interfaces/api.interface';
import type { Project } from '@/interfaces/project.interface';
import type { Task } from '@/interfaces/task.interface';
import type { Note } from '@/interfaces/note.interface';

interface NoteProps {
	projectId: Project['_id'];
	taskId: Task['_id'];
	noteId: Note['_id'];
}

export async function deleteNote({ projectId, taskId, noteId }: NoteProps) {
	try {
		const url = `/projects/${projectId}/tasks/${taskId}/notes/${noteId}`;
		const { data } = await api.delete<ResponseData>(url);

		return data.message;
	} catch (error) {
		throw new Error(responseError(error as Error));
	}
}
