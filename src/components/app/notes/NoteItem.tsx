import { formatDate } from '@/utils';
import { TrashIcon } from '@heroicons/react/24/outline';
import type { Note } from '@/interfaces/note.interface';

interface NoteItemProps {
	note: Note;
}

export const NoteItem = ({ note }: NoteItemProps) => {
	return (
		<li className='p-3 bg-amber-200 rounded relative flex flex-col justify-between gap-2 w-48 min-w-48'>
			<p className='text-sm'>{note.content}</p>
			<p className='text-xs text-slate-500'>{formatDate(note.createdAt)}</p>
			<button
				onClick={() => {}}
				className='absolute bottom-2 right-2 rounded-full p-1 text-red-600 hover:bg-red-600 hover:text-white transition-colors'>
				<TrashIcon className='w-5 h-5' />
			</button>
		</li>
	);
};
