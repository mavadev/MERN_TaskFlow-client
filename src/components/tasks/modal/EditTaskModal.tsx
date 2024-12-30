import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { DialogPanel, DialogTitle } from '@headlessui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { Project, TaskEditData } from '@/interfaces';
import { ErrorMessage } from '@/components/ErrorMessage';
import { getTask, editTask } from '@/api/TaskAPI';
import { statusTranslate } from '@/locales/es';
import { TaskModal } from './TaskModal';
import TaskForm from './TaskForm';

export default function EditTaskModal({ projectId }: { projectId: Project['_id'] }) {
	const navigate = useNavigate();
	const location = useLocation();
	const taskId = new URLSearchParams(location.search).get('editTask')!;

	// OBTENER TAREA POR ID
	const { data, isError } = useQuery({
		retry: false,
		enabled: !!taskId,
		queryKey: ['editTask', taskId],
		queryFn: () => getTask({ projectId, taskId }),
	});

	// CONFIGURACIÓN DE FORMULARIO
	const {
		reset,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TaskEditData>({
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
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['project', projectId] });
			queryClient.invalidateQueries({ queryKey: ['editTask', taskId] });
			toast.success('Tarea actualizada correctamente');
			navigate(location.pathname);
			reset();
		},
		onError: error => {
			toast.error(error.message);
		},
	});
	const handleEditTask = (formData: TaskEditData) => mutate({ projectId, taskId, formData });

	return (
		<TaskModal
			show={!!taskId}
			handleOnClose={() => navigate(location.pathname)}>
			<DialogPanel className='w-11/12 max-w-3xl transform overflow-hidden rounded-lg bg-white transition-all p-10 md:px-14 space-y-5'>
				<DialogTitle
					as='h3'
					className='font-bold text-3xl my-4'>
					Editar Tarea
				</DialogTitle>
				<p className='text-xl '>
					Edita el formulario y actualiza <span className='text-yellow-600 font-bold'>la tarea</span>
				</p>
				<form
					noValidate
					className='space-y-5'
					onSubmit={handleSubmit(handleEditTask)}>
					<TaskForm
						errors={errors}
						register={register}
					/>
					<div className='flex flex-col'>
						<label
							htmlFor='status'
							className='label-form'>
							Estado
						</label>
						<select
							id='status'
							defaultValue={data?.status}
							className='input-form select-none'
							{...register('status', { required: 'El estado de la tarea es obligatoria' })}>
							{Object.entries(statusTranslate).map(([status, translate]) => (
								<option
									key={status}
									value={status}>
									{translate}
								</option>
							))}
						</select>
						{errors.status?.message && <ErrorMessage error={errors.status.message} />}
					</div>
					<input
						type='submit'
						value='Editar Tarea'
						className='btn-secondary p-4 w-full'
					/>
				</form>
			</DialogPanel>
		</TaskModal>
	);
}
