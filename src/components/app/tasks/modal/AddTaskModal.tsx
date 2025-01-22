import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { DialogTitle } from '@headlessui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { TaskModal } from './TaskModal';
import { createTask } from '@/api/TaskAPI';
import type { Project } from '@/interfaces/project.interface';
import type { TaskCreate, TaskStatus } from '@/interfaces/task.interface';
import TaskForm from './TaskForm';

export default function AddTaskModal() {
	const navigate = useNavigate();

	const params = useParams();
	const projectId = params.projectId as Project['_id'];

	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);

	const newTask = !!searchParams.get('newTask');
	const statusTask = searchParams.get('status') as TaskStatus;

	const {
		reset,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TaskCreate>({
		defaultValues: {
			name: '',
			description: '',
			status: 'pending',
		},
	});

	useEffect(() => {
		if (statusTask) {
			reset({
				name: '',
				description: '',
				status: statusTask,
			});
		}
	}, [statusTask]);

	// Petición API - POST
	const queryClient = useQueryClient();
	const { mutate } = useMutation({
		mutationFn: createTask,
		onSuccess: message => {
			toast.success(message);
			queryClient.invalidateQueries({ queryKey: ['project', projectId] });
			navigate(location.pathname);
			reset();
		},
		onError: error => {
			toast.error(error.message);
		},
	});
	const handleCreateTask = (formData: TaskCreate) => mutate({ projectId, formData });

	return (
		<TaskModal
			show={newTask}
			handleOnClose={() => navigate(location.pathname)}>
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
		</TaskModal>
	);
}
