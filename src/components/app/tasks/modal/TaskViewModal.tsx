import { toast } from 'react-toastify';
import { DialogTitle } from '@headlessui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { statusTranslate } from '@/locales/es';
import { updateStatus, updateAssignTo } from '@/api/TaskAPI';
import type { Project } from '@/interfaces/project.interface';
import type { Task, TaskStatus } from '@/interfaces/task.interface';
import type { TeamMember, TeamResponse } from '@/interfaces/team.interface';

type TaskViewModalProps = {
	task: Task;
	team: TeamResponse;
};

export default function TaskViewModal({ task, team }: TaskViewModalProps) {
	const location = useLocation();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [searchParams] = useSearchParams();

	const taskId = searchParams.get('taskId')!;
	const { projectId } = useParams() as { projectId: Project['_id'] };

	const successChange = (message: string) => {
		queryClient.invalidateQueries({ queryKey: ['task', taskId] });
		queryClient.invalidateQueries({ queryKey: ['project', projectId] });
		toast.success(message);
	};

	const errorChange = (error: Error) => {
		toast.error(error.message);
		navigate(location.pathname);
	};

	// CAMBIAR USUARIO ASIGNADO
	const handleChangeAssignTo = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const assignTo = e.target.value as TeamMember['_id'];
		updateAssignTo({ projectId, taskId, assignTo }).then(successChange).catch(errorChange);
	};

	// CAMBIAR ESTADO DE TAREA
	const handleChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const status = e.target.value as TaskStatus;
		updateStatus({ projectId, taskId, status }).then(successChange).catch(errorChange);
	};

	return (
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
							key={team.manager._id}
							value={team.manager._id}>
							{team.manager.name}
						</option>
						{team.team.map(teamMember => (
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
	);
}
