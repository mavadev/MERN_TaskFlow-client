import { toast } from 'react-toastify';
import { DialogTitle } from '@headlessui/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';

import { Modal } from '../../modal/Modal';
import { statusTranslate } from '@/locales/es';
import { getProjectTeam } from '@/api/TeamProjectAPI';
import { getTask, updateStatus, updateAssignTo } from '@/api/TaskAPI';
import type { Project } from '@/interfaces/project.interface';
import type { TaskStatus } from '@/interfaces/task.interface';
import type { TeamMember } from '@/interfaces/team.interface';

export default function ViewTaskModal() {
	const navigate = useNavigate();

	const params = useParams();
	const projectId = params.projectId as Project['_id'];

	const location = useLocation();
	const taskId = new URLSearchParams(location.search).get('viewTask')!;

	const {
		data: task,
		isLoading,
		isError,
	} = useQuery({
		enabled: !!taskId,
		queryKey: ['task', taskId],
		queryFn: () => getTask({ projectId, taskId }),
		retry: false,
	});

	const { data: teamData } = useQuery({
		enabled: !!taskId,
		queryKey: ['project-team', projectId],
		queryFn: () => getProjectTeam({ projectId }),
		retry: false,
	});

	const queryClient = useQueryClient();
	const successChange = (message: string) => {
		toast.success(message);
		queryClient.invalidateQueries({ queryKey: ['project', projectId] });
		queryClient.invalidateQueries({ queryKey: ['task--view', taskId] });
	};

	// Cambiar el usuario asignado a la tarea
	const handleChangeAssignTo = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const assignTo = e.target.value as TeamMember['_id'];

		updateAssignTo({ projectId, taskId, assignTo })
			.then(successChange)
			.catch(error => toast.error(error.message));
	};

	// Cambiar el estado de la tarea
	const handleChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const status = e.target.value as TaskStatus;

		updateStatus({ projectId, taskId, status })
			.then(successChange)
			.catch(error => toast.error(error.message));
	};

	const handleClose = () => navigate(location.pathname);

	if (isError) return <Navigate to={location.pathname} />;

	return (
		<Modal
			show={!!taskId}
			handleOnClose={handleClose}>
			{isLoading || !task ? (
				<h2 className='text-center text-lg font-medium'>Cargando...</h2>
			) : (
				<>
					<header>
						<p className='text-sm text-slate-400'>Agregada el: {task.name}</p>
						<p className='text-sm text-slate-400'>Última actualización: {task.name}</p>
						<DialogTitle
							as='h3'
							className='font-black text-3xl text-slate-600 my-5'>
							{task.name}
						</DialogTitle>
					</header>
					<p className='text-lg text-slate-500 mb-2'>Descripción:</p>
					<p className='text-lg text-slate-500 mb-2'>{task.description}</p>
					{/* Notas */}
					{/* <NotesList notes={task.notes} /> */}

					{/* Estado y Asignado a */}
					<div className='flex gap-2'>
						<div className='flex flex-col flex-1'>
							<label htmlFor='status'>Estado</label>
							<select
								id='status'
								onChange={handleChangeStatus}
								defaultValue={task.status}
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
						<div className='flex flex-col flex-1'>
							<label htmlFor='assignTo'>Asignado a</label>
							<select
								id='assignTo'
								className='input-form select-none'
								onChange={handleChangeAssignTo}
								defaultValue={task.assignedTo?._id}>
								<option value=''>Sin asignar</option>
								<option
									key={teamData?.manager._id}
									value={teamData?.manager._id}>
									{teamData?.manager.name}
								</option>
								{teamData?.team.map(teamMember => (
									<option
										key={teamMember._id}
										value={teamMember._id}>
										{teamMember.name}
									</option>
								))}
							</select>
						</div>
					</div>
				</>
			)}
		</Modal>
	);
}
