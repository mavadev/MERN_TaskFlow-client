import { toast } from 'react-toastify';
import { DialogTitle } from '@headlessui/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';

import type { Project, TaskStatus } from '@/interfaces';
import { getTask, updateStatus } from '@/api/TaskAPI';
import { statusTranslate } from '@/locales/es';
import { TaskModal } from './TaskModal';

export default function ViewTaskModal() {
	const navigate = useNavigate();

	const params = useParams();
	const projectId = params.projectId as Project['_id'];

	const location = useLocation();
	const taskId = new URLSearchParams(location.search).get('viewTask')!;

	const { data, isLoading, isError } = useQuery({
		enabled: !!taskId,
		queryKey: ['task--view', taskId],
		queryFn: () => getTask({ projectId, taskId }),
	});

	const queryClient = useQueryClient();
	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const status = e.target.value as TaskStatus;

		updateStatus({ projectId, taskId, status })
			.then(() => queryClient.invalidateQueries({ queryKey: ['project', projectId] }))
			.catch(error => toast.error(error.message));
	};
	const handleClose = () => navigate(location.pathname);

	if (isError) return <Navigate to={location.pathname} />;

	return (
		<TaskModal
			show={!!taskId}
			handleOnClose={handleClose}>
			{isLoading || !data ? (
				<h2 className='text-center text-lg font-medium'>Cargando...</h2>
			) : (
				<>
					<header>
						<p className='text-sm text-slate-400'>Agregada el: {data.name}</p>
						<p className='text-sm text-slate-400'>Última actualización: {data.name}</p>
						<DialogTitle
							as='h3'
							className='font-black text-3xl text-slate-600 my-5'>
							{data.name}
						</DialogTitle>
					</header>
					<p className='text-lg text-slate-500 mb-2'>Descripción:</p>
					<p className='text-lg text-slate-500 mb-2'>{data.description}</p>
					<div className='flex flex-col'>
						<label htmlFor='status'>Estado</label>
						<select
							id='status'
							onChange={handleChange}
							defaultValue={data.status}
							className='input-form select-none'>
							{Object.entries(statusTranslate).map(([status, translate]) => (
								<option
									key={status}
									value={status}>
									{translate}
								</option>
							))}
						</select>
					</div>
				</>
			)}
		</TaskModal>
	);
}
