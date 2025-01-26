import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { DialogTitle } from '@headlessui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';

import TaskForm from './TaskForm';
import { editTask } from '@/api/TaskAPI';
import type { Project } from '@/interfaces/project.interface';
import type { Task, TaskDraft } from '@/interfaces/task.interface';
import type { TeamResponse } from '@/interfaces/team.interface';

type EditTaskModalProps = {
	task: Task;
	team: TeamResponse;
};

export default function EditTaskModal({ task, team }: EditTaskModalProps) {
	const location = useLocation();
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	const taskId = searchParams.get('taskId')!;
	const { projectId } = useParams() as { projectId: Project['_id'] };

	// CONFIGURACIÓN DE FORMULARIO
	const {
		reset,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TaskDraft>({
		defaultValues: {
			name: task.name,
			description: task.description,
			status: task.status,
			assignedTo: task.assignedTo?._id || '',
		},
	});

	// EDITAR TAREA
	const queryClient = useQueryClient();
	const { mutate } = useMutation({
		mutationFn: editTask,
		onSuccess: message => {
			toast.success(message);
			queryClient.invalidateQueries({ queryKey: ['task', taskId] });
			queryClient.invalidateQueries({ queryKey: ['project', projectId] });
			navigate(location.pathname);
			reset();
		},
		onError: error => {
			toast.error(error.message);
		},
	});
	const handleEditTask = (formData: TaskDraft) => mutate({ projectId, taskId, formData });

	return (
		<>
			<DialogTitle
				as='h3'
				className='font-bold text-3xl my-4'>
				Editar Tarea
			</DialogTitle>
			<p className='text-xl'>
				Edita el formulario y actualiza <span className='text-yellow-600 font-bold'>la tarea</span>
			</p>
			<form
				noValidate
				className='space-y-5'
				onSubmit={handleSubmit(handleEditTask)}>
				<TaskForm
					teamData={team}
					errors={errors}
					register={register}
				/>
				<input
					type='submit'
					value='Editar Tarea'
					className='btn-secondary p-4 w-full'
				/>
			</form>
		</>
	);
}
