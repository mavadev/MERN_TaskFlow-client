import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { DialogPanel, DialogTitle } from '@headlessui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { Project, TaskCreateData } from '@/interfaces';
import { createTask } from '@/api/TaskAPI';
import { TaskModal } from './TaskModal';
import TaskForm from './TaskForm';

export default function AddTaskModal({ projectId }: { projectId: Project['_id'] }) {
	const navigate = useNavigate();
	const location = useLocation();
	const newTask = !!new URLSearchParams(location.search).get('newTask');

	const {
		reset,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TaskCreateData>({
		defaultValues: {
			name: '',
			description: '',
		},
	});

	// Petición API - POST
	const queryClient = useQueryClient();
	const { mutate } = useMutation({
		mutationFn: createTask,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['project', projectId] });
			toast.success('Tarea añadida correctamente');
			navigate(location.pathname);
			reset();
		},
		onError: error => {
			toast.error(error.message);
		},
	});
	const handleCreateTask = (formData: TaskCreateData) => mutate({ projectId, formData });

	return (
		<TaskModal
			show={newTask}
			handleOnClose={() => navigate(location.pathname)}>
			<DialogPanel className='w-11/12 max-w-3xl transform overflow-hidden rounded-lg bg-white transition-all p-10 md:px-14 space-y-5'>
				<DialogTitle
					as='h3'
					className='font-bold text-3xl my-4'>
					Nueva Tarea
				</DialogTitle>
				<p className='text-xl '>
					Llena el formulario y crea <span className='text-yellow-600 font-bold'>una tarea</span>
				</p>
				<form
					noValidate
					className='space-y-5'
					onSubmit={handleSubmit(handleCreateTask)}>
					<TaskForm
						errors={errors}
						register={register}
					/>
					<input
						type='submit'
						value='Añadir Tarea'
						className='btn-secondary p-4 w-full'
					/>
				</form>
			</DialogPanel>
		</TaskModal>
	);
}
