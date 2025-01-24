import { toast } from 'react-toastify';
import { MenuItem } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { OptionsMenu } from '../OptionsMenu';
import { deleteTask } from '@/api/TaskAPI';
import type { Task } from '@/interfaces/task.interface';

type TaskCardProps = {
	task: Task;
	isManager: boolean;
};

export const TaskCard = ({ task, isManager }: TaskCardProps) => {
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

	const handleViewTask = () => navigate(location.pathname + `?viewTask=${task._id}`);
	const handleEditTask = () => navigate(location.pathname + `?editTask=${task._id}`);
	const handleDeleteTask = () => {
		window.confirm('¿Estás seguro de querer eliminar esta tarea?') &&
			mutate({ projectId: task.project, taskId: task._id });
	};

	const avatar = `${import.meta.env.VITE_PUBLIC_URL}${task.assignedTo?.avatar}`;

	return (
		<li className='p-4 bg-white border border-slate-400 flex justify-between gap-3 rounded cursor-pointer'>
			<div className='flex flex-col gap-y-2'>
				<p
					onClick={handleViewTask}
					className='font-bold text-gray-700 text-left line-clamp-2 text-balance md:text-sm'>
					{task.name}
				</p>
				<p className='md:text-sm text-slate-500 line-clamp-2'>{task.description}</p>
				{task.assignedTo ? (
					<div className='flex gap-2 items-center mt-3'>
						<img
							src={avatar}
							alt={task.assignedTo.username}
							className='w-5 h-5 rounded-full'
						/>
						<p className='text-sm text-gray-500'>{task.assignedTo.name}</p>
					</div>
				) : (
					<p className='text-sm text-gray-500 mt-3'>Sin asignar</p>
				)}
			</div>
			<OptionsMenu>
				<MenuItem>
					<button
						type='button'
						onClick={handleViewTask}
						className='block px-3 py-2 text-sm font-medium leading-6 text-gray-700 w-full hover:bg-gray-50'>
						Ver Tarea
					</button>
				</MenuItem>
				{isManager && (
					<>
						<MenuItem>
							<button
								type='button'
								onClick={handleEditTask}
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
					</>
				)}
			</OptionsMenu>
		</li>
	);
};
