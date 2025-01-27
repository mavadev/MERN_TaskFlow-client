import { NoteItem } from './NoteItem';
import type { Note } from '@/interfaces/note.interface';

interface NoteListProps {
	notes: Note[];
}

export const NoteList = ({ notes }: NoteListProps) => {
	if (!notes.length) return <p className='text-slate-600'>No hay notas</p>;
	return (
		<ul className='w-full flex gap-2 flex-nowrap overflow-auto'>
			{notes.map(note => (
				<NoteItem
					key={note._id}
					note={note}
				/>
			))}
		</ul>
	);
};
