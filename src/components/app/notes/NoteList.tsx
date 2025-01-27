import { NoteItem } from './NoteItem';
import type { Project } from '@/interfaces/project.interface';
import type { Task } from '@/interfaces/task.interface';
import type { Note } from '@/interfaces/note.interface';

interface NoteListProps {
	notes: Note[];
	projectId: Project['_id'];
	taskId: Task['_id'];
}

export const NoteList = ({ notes, taskId, projectId }: NoteListProps) => {
	if (!notes.length) return <p className='text-slate-600'>No hay notas</p>;

	return (
		<ul className='w-full flex gap-2 flex-nowrap overflow-auto'>
			{notes.map(note => (
				<NoteItem
					key={note._id}
					note={note}
					taskId={taskId}
					projectId={projectId}
				/>
			))}
		</ul>
	);
};
