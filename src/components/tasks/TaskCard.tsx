import { MenuItem } from '@headlessui/react';
import { OptionsMenu } from '../OptionsMenu';
import { Task } from '@/interfaces';

export const TaskCard = ({ task }: { task: Task }) => {
	return (
		<li className='p-4 bg-white border-slate-800 flex justify-between gap-3 rounded'>
			<div className='flex flex-col gap-y-2'>
				<button
					type='button'
					className='font-bold text-gray-700 text-left'>
					{task.name}
				</button>
				<p className='text-sm text-slate-500 line-clamp-2'>{task.description}</p>
			</div>
			<OptionsMenu>
				<MenuItem>
					<button
						type='button'
						className='block px-3 py-2 text-sm leading-6 text-gray-900 w-full hover:bg-gray-50'>
						Ver Tarea
					</button>
				</MenuItem>
				<MenuItem>
					<button
						type='button'
						className='block px-3 py-2 text-sm leading-6 text-gray-900 w-full hover:bg-gray-50'>
						Editar Tarea
					</button>
				</MenuItem>

				<MenuItem>
					<button
						type='button'
						className='block px-3 py-2 text-sm leading-6 text-red-500 w-full hover:bg-gray-50'>
						Eliminar Tarea
					</button>
				</MenuItem>
			</OptionsMenu>
		</li>
	);
};
