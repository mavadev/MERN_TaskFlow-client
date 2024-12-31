import { toast } from 'react-toastify';
import { MenuItem } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { OptionsMenu } from '../OptionsMenu';
import { deleteTask } from '@/api/TaskAPI';
import type { Task } from '@/interfaces';

export const TaskCard = ({ task }: { task: Task }) => {
	const navigate = useNavigate();

	const queryClient = useQueryClient();
	const { mutate } = useMutation({
		mutationFn: deleteTask,
		onSuccess: message => {
			queryClient.invalidateQueries({ queryKey: ['project', task.project] });
			toast.success(message);
		},
		onError: error => {
			toast.error(error.message);
		},
	});
	const handleDeleteTask = () => mutate({ projectId: task.project, taskId: task._id });

	return (
		<li className='p-4 bg-white border border-slate-200 flex justify-between gap-3 rounded'>
			<div className='flex flex-col gap-y-2'>
				<button
					type='button'
					className='font-bold text-gray-700 text-left line-clamp-2 text-balance md:text-sm'>
					{task.name}
				</button>
				<p className='md:text-sm text-slate-500 line-clamp-2'>{task.description}</p>
			</div>
			<OptionsMenu>
				<MenuItem>
					<button
						type='button'
						onClick={() => navigate(location.pathname + `?viewTask=${task._id}`)}
						className='block px-3 py-2 text-sm font-medium leading-6 text-gray-700 w-full hover:bg-gray-50'>
						Ver Tarea
					</button>
				</MenuItem>
				<MenuItem>
					<button
						type='button'
						onClick={() => navigate(location.pathname + `?editTask=${task._id}`)}
						className='block px-3 py-2 text-sm font-medium leading-6 text-gray-700 w-full hover:bg-gray-50'>
						Editar Tarea
					</button>
				</MenuItem>
				<MenuItem>
					<button
						type='button'
						onClick={handleDeleteTask}
						className='block px-3 py-2 text-sm font-medium leading-6 bg-red-500 w-full hover:bg-red-600 text-white'>
						Eliminar Tarea
					</button>
				</MenuItem>
			</OptionsMenu>
		</li>
	);
};
