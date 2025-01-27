import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { DialogTitle } from '@headlessui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import TaskForm from './TaskForm';
import { createTask } from '@/api/TaskAPI';
import type { Project } from '@/interfaces/project.interface';
import type { TeamResponse } from '@/interfaces/team.interface';
import type { TaskDraft, TaskStatus } from '@/interfaces/task.interface';

interface TaskAddModalProps {
	team: TeamResponse;
	status: TaskStatus;
}

export default function TaskAddModal({ team, status }: TaskAddModalProps) {
	const navigate = useNavigate();
	const location = useLocation();

	const { projectId } = useParams() as { projectId: Project['_id'] };

	// CONFIGURACIÓN DE FORMULARIO
	const {
		reset,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TaskDraft>({
		defaultValues: {
			name: '',
			description: '',
			status: status || 'pending',
			assignedTo: undefined,
		},
	});

	// AÑADIR TAREA
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
	const handleCreateTask = (formData: TaskDraft) => mutate({ projectId, formData });

	return (
		<div className='py-10 space-y-5'>
			<header className='space-y-2 px-10'>
				<h3 className='font-bold text-3xl '>Nueva Tarea</h3>
				<p className='text-xl '>
					Llena el formulario y crea <span className='text-yellow-600 font-bold'>una tarea</span>
				</p>
			</header>
			<form
				noValidate
				className='space-y-5 px-10'
				onSubmit={handleSubmit(handleCreateTask)}>
				<TaskForm
					teamData={team}
					errors={errors}
					register={register}
				/>
				<input
					type='submit'
					value='Añadir Tarea'
					className='btn-secondary p-4 w-full'
				/>
			</form>
		</div>
	);
}
