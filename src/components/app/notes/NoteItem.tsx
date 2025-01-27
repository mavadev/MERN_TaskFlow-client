import { formatDate } from '@/utils';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TrashIcon } from '@heroicons/react/24/outline';

import { deleteNote } from '@/api/NoteAPI';
import type { Note } from '@/interfaces/note.interface';
import type { Task } from '@/interfaces/task.interface';
import type { Project } from '@/interfaces/project.interface';

interface NoteItemProps {
	note: Note;
	taskId: Task['_id'];
	projectId: Project['_id'];
}

export const NoteItem = ({ projectId, taskId, note }: NoteItemProps) => {
	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		retry: false,
		mutationFn: deleteNote,
		onSuccess: message => {
			toast.success(message);
			queryClient.invalidateQueries({ queryKey: ['task', taskId] });
		},
		onError: error => {
			toast.error(error.message);
		},
	});

	const handleDeleteNote = () => mutate({ projectId, taskId, noteId: note._id });

	return (
		<li className='p-3 bg-amber-200 rounded relative flex flex-col justify-between gap-2 w-48 min-w-48'>
			<p className='text-sm'>{note.content}</p>
			<p className='text-xs text-slate-500'>{formatDate(note.createdAt)}</p>
			<button
				onClick={handleDeleteNote}
				className='absolute bottom-2 right-2 rounded-full p-1 text-red-600 hover:bg-red-600 hover:text-white transition-colors'>
				<TrashIcon className='w-5 h-5' />
			</button>
		</li>
	);
};
