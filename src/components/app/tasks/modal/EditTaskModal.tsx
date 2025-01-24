import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { DialogTitle } from '@headlessui/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import TaskForm from './TaskForm';
import { Modal } from '../../modal/Modal';
import { getTask, editTask } from '@/api/TaskAPI';
import type { Project } from '@/interfaces/project.interface';
import type { TaskCreate } from '@/interfaces/task.interface';
import { getProjectTeam } from '@/api/TeamProjectAPI';

export default function EditTaskModal() {
	const navigate = useNavigate();

	const params = useParams();
	const projectId = params.projectId as Project['_id'];

	const location = useLocation();
	const taskId = new URLSearchParams(location.search).get('editTask')!;

	// OBTENER TAREA POR ID
	const { data, isError } = useQuery({
		retry: false,
		enabled: !!taskId,
		queryKey: ['task--view', taskId],
		queryFn: () => getTask({ projectId, taskId }),
	});

	// OBTENER EQUIPO DEL PROYECTO
	const { data: teamData } = useQuery({
		queryKey: ['project-team', projectId],
		queryFn: () => getProjectTeam({ projectId }),
		retry: false,
	});

	// CONFIGURACIÓN DE FORMULARIO
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

	// DATOS DE FORMULARIO
	useEffect(() => {
		if (data) {
			reset({
				name: data.name,
				description: data.description,
				status: data.status,
				assignedTo: data.assignedTo?._id || '',
			});
		}
		if (isError) {
			toast.error('Hubo un error al obtener la tarea');
			navigate(location.pathname);
		}
	}, [data, isError]);

	// EDITAR TAREA
	const queryClient = useQueryClient();
	const { mutate } = useMutation({
		mutationFn: editTask,
		onSuccess: message => {
			toast.success(message);
			queryClient.invalidateQueries({ queryKey: ['project', projectId] });
			queryClient.invalidateQueries({ queryKey: ['task--edit', taskId] });
			navigate(location.pathname);
			reset();
		},
		onError: error => {
			toast.error(error.message);
		},
	});
	const handleEditTask = (formData: TaskCreate) => mutate({ projectId, taskId, formData });

	return (
		<Modal
			show={!!taskId}
			handleOnClose={() => navigate(location.pathname)}>
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
					errors={errors}
					register={register}
					teamData={teamData!}
				/>
				<input
					type='submit'
					value='Editar Tarea'
					className='btn-secondary p-4 w-full'
				/>
			</form>
		</Modal>
	);
}
